import {DynamoDB} from '@aws-sdk/client-dynamodb'
import {DynamoDBDocument} from '@aws-sdk/lib-dynamodb'
import AWSXray from 'aws-xray-sdk-core'
import {EnvironmentService} from '../services/environmentService.mjs'
import {createLogger} from '../utils/logger.mjs';
import {TimingService} from '../services/timingService.mjs'
import {MetricsService} from '../services/metricsService.mjs'

const logger = createLogger('TodosAccess');

export class TodosAccess {

    constructor(
        documentClient = DynamoDBDocument.from(AWSXray.captureAWSv3Client(new DynamoDB({
            //This line is required since it prevents from parsing 
            //null values from dynamoDB. Github Issue link (for a higher version used):
            //https://github.com/aws/aws-sdk-js-v3/issues/4504
            logger: undefined
        }))),
        environmentService = new EnvironmentService(),
        timingService = new TimingService(),
        metricsService = new MetricsService(),
    ){
        this.documentClient = documentClient;
        this.environmentService = environmentService;
        this.timingService = timingService;
        this.metricsService = metricsService;
    }

    async createTodo(newTodo) {

        const startTime = this.timingService.getTimeInMillis();
        await this.documentClient.put({
            Item: newTodo,
            TableName: this.environmentService.todosTable()
        })
        await this.sendDynamoDbDelayMetric(startTime, 'dynamodb:put');
        
        logger.info(`Confirmed insertion of new Todo with id ${newTodo.todoId}`);
    }

    async getTodos(userId) {
        const startTime = this.timingService.getTimeInMillis();
        const result = await this.documentClient.query({
            TableName: this.environmentService.todosTable(),
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId
            },
            ScanIndexForward: false
        });
        await this.sendDynamoDbDelayMetric(startTime, 'dynamodb:query');

        logger.info(`Returning a total of ${result.Items.length} for user: ${userId}`);
        return result.Items;
    }

    async deleteTodo(todoId, userId){
        const startTime = this.timingService.getTimeInMillis();
        await this.documentClient.delete({
            TableName: this.environmentService.todosTable(),
            Key: {
                userId,
                todoId,
            }
        })
        await this.sendDynamoDbDelayMetric(startTime, 'dynamodb:delete');

        logger.info(`Confirmed that user ${userId} deleted todo ${todoId}`);
    }

    async updateTodo(updatedTodo, todoId, userId){
        const dbUpdateCommand = this.buildSetUpdateCommand(updatedTodo);
        const startTime = this.timingService.getTimeInMillis();
        await this.documentClient.update({
            TableName: this.environmentService.todosTable(),
            Key: {userId, todoId},
            UpdateExpression: dbUpdateCommand.command,
            ExpressionAttributeNames: dbUpdateCommand.variableNames,
            ExpressionAttributeValues: dbUpdateCommand.variableValues,
            ReturnValues: "ALL_NEW"
        });
        await this.sendDynamoDbDelayMetric(startTime, 'dynamodb:update');

        logger.info(`Confirmed that user ${userId} updated todo ${todoId}`);
    }

    async updateS3ImageUrl(todoId, userId, s3Url){
        const startTime = this.timingService.getTimeInMillis();
        await this.documentClient.update({
            TableName: this.environmentService.todosTable(),
            Key: {userId, todoId},
            UpdateExpression: 'SET attachmentUrl = :attachmentUrl',
            ExpressionAttributeValues: {
                ':attachmentUrl': s3Url
            }
        })
        await this.sendDynamoDbDelayMetric(startTime, 'dynamodb:update');

        logger.info(`Confirmed registration of S3 URL for todo ${todoId} by user ${userId}`);
    }

    buildSetUpdateCommand(updatedTodo){
        let updates = [];
        const variableNames = {};
        const variableValues = {};
        if(updatedTodo.hasOwnProperty('name')){
            updates.push('#name = :name')
            variableNames["#name"] = 'name'
            variableValues[':name'] = updatedTodo.name;
        }
        if(updatedTodo.hasOwnProperty('dueDate')){
            updates.push('#dueDate = :dueDate')
            variableNames["#dueDate"] = 'dueDate'
            variableValues[':dueDate'] = updatedTodo.dueDate;
        }
        if(updatedTodo.hasOwnProperty('done')){
            updates.push('#done = :done');
            variableNames['#done'] = 'done'
            variableValues[':done'] = updatedTodo.done
        }

        const command = "SET " + updates.join(', ');
        return {
            command,
            variableNames,
            variableValues
        };
    }

    async sendDynamoDbDelayMetric(startTime, metricName){
        const timeDiff = this.timingService.getTimeDifference(startTime);
        const delayMetric = this.metricsService.createMetric({
            dataValue: timeDiff,
            unit: 'Milliseconds',
            metricName: metricName
        });
        await this.metricsService.sendMetric(delayMetric);
    }
}