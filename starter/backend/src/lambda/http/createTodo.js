import { parseUserIdFromHeader } from "../../auth/utils.mjs";
import { Todos } from "../../businessLayer/todos.mjs"
import { createResponse } from "../../utils/lambdaResponse.mjs"
import { createLogger } from "../../utils/logger.mjs";

const logger = createLogger('createTodo')
const todos = new Todos();

export async function handler(event) {

  logger.info('Create todo handler reached.')
  const newTodo = JSON.parse(event.body)

  const userId = parseUserIdFromHeader(event.headers.Authorization)
  const resultTodo = await todos.createTodo(newTodo, userId);

  logger.info('returning a 201 response')
  return createResponse({
    body: resultTodo,
    status: 201
  });

}

