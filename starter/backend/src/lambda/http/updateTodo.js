import { parseUserIdFromHeader } from "../../auth/utils.mjs"
import { Todos } from "../../businessLayer/todos.mjs";
import { createResponse } from "../../utils/lambdaResponse.mjs";
import { createLogger } from "../../utils/logger.mjs";

const todos = new Todos();
const logger = createLogger('updateTodo')

export async function handler(event) {
  logger.info('Update Todo hanlder reached');

  const todoId = event.pathParameters.todoId
  const updatedTodo = JSON.parse(event.body)
  const userId = parseUserIdFromHeader(event.headers.Authorization);

  await todos.updateTodo(updatedTodo, todoId, userId);
  
  logger.info('Returning a 200 response');
  // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
  return createResponse({
    body: {message: 'ok'}
  });
}
