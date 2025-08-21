import { TodosAccess } from "../dataLayer/todosAccess.mjs";
import { UUIDService } from "../services/uuidService.mjs"
import { createLogger } from "../utils/logger.mjs"
import { AttachmentUtils } from '../fileStorage/attachmentUtils.mjs'

const todosService = new TodosAccess();
const uuidService = new UUIDService();
const attachmentUtils = new AttachmentUtils();
const logger = createLogger('createTodoCase');

export class Todos {
    async createTodo(newTodo, userId) {

        const insertedTodo = {
            name: newTodo.name, 
            dueDate: newTodo.dueDate
        };
        insertedTodo.todoId = uuidService.generateUUIDV4();
        insertedTodo.done = false;
        insertedTodo.attachmentUrl = null,
        insertedTodo.userId = userId;
        insertedTodo.createdAt = new Date().toISOString();
        logger.info(`Creating todo with id: ${insertedTodo.todoId}`)
        await todosService.createTodo(insertedTodo);
        logger.info(`Succesfully created Todo with id ${insertedTodo.todoId}`)

        return insertedTodo;
    }

    async getTodos(userId) {
        logger.info(`Querying todos for user ${userId}`);
        return await todosService.getTodos(userId);
    }

    async deleteTodo(todoId, userId){
        logger.info(`Deleting todo with id ${todoId} for user ${userId}`);
        return await todosService.deleteTodo(todoId, userId);
    }

    async updateTodo(updatedTodo, todoId, userId){
        logger.info(`Updating todo with id ${todoId} for user ${userId}`);
        return await todosService.updateTodo(updatedTodo, todoId, userId);
    }

    async generateImageUploadUrl(todoId, userId){
        const imageId = uuidService.generateUUIDV4();
        const s3Url = attachmentUtils.generateS3Url(imageId);

        await todosService.updateS3ImageUrl(todoId, userId, s3Url);
        logger.info(`Updated ${todoId} to have s3 url for image ${imageId}`)

        const uploadUrl = await attachmentUtils.generateUploadUrl(imageId);
        logger.info(`generated uploadUrl for image with id ${imageId}`)
        return uploadUrl;
    }
}
