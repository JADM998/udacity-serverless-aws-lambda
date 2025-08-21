import { CloudWatchClient, PutMetricDataCommand } from '@aws-sdk/client-cloudwatch';
import AWSXray from 'aws-xray-sdk-core'

export class MetricsService {
    
    constructor(
        cloudwatch = AWSXray.captureAWSv3Client(new CloudWatchClient())
    ){
        this.cloudwatch = cloudwatch;
    }

    createMetric({metricName, dataValue, unit, namespace='Udacity/TodoApp', serviceName='TodoApp'}){
        return new PutMetricDataCommand({
            MetricData: [{
                    MetricName: metricName,
                    Dimensions: [{
                        Name: 'ServiceName',
                        Value: serviceName
                    }],
                    Unit: unit,
                    Value: dataValue
            }],
            Namespace: namespace
        });
    }

    async sendMetric(metric) {
        await this.cloudwatch.send(metric);
    }
}