import { createResponse } from "../../utils/lambdaResponse.mjs";
import { createLogger } from "../../utils/logger.mjs"
import { parseUserIdFromHeader } from "../../auth/utils.mjs"
import { Todos } from "../../businessLayer/todos.mjs";

const logger = createLogger('GetTodos');
const todos = new Todos();

export async function handler(event) {
  
  logger.info('reached GetTodos Handler')
  const userId = parseUserIdFromHeader(event.headers.Authorization);

  const todoList = await todos.getTodos(userId);

  logger.info('Returning a 200 response');
  return createResponse({
    body: {items: todoList},
  })
}
