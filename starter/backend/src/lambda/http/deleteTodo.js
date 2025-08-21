import { parseUserIdFromHeader } from "../../auth/utils.mjs"
import { Todos } from "../../businessLayer/todos.mjs";
import { createResponse } from "../../utils/lambdaResponse.mjs"
import { createLogger } from "../../utils/logger.mjs";

const todos = new Todos();
const logger = createLogger('deleteTodo')

export async function handler(event) {
  logger.info('Delete Todo handler reached')
  const todoId = event.pathParameters.todoId
  const userId = parseUserIdFromHeader(event.headers.Authorization);
  
  await todos.deleteTodo(todoId, userId);

  logger.info('Returning a 200 response');
  return createResponse({
    body: {message: 'ok'},
  })
}

