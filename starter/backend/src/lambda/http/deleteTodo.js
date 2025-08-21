import { parseUserIdFromHeader } from "../../auth/utils.mjs"
import { Todos } from "../../businessLayer/todos.mjs";
import { UUIDService } from "../../services/uuidService.mjs";
import { createResponse } from "../../utils/lambdaResponse.mjs"
import { createLogger } from "../../utils/logger.mjs";

const todos = new Todos();
const logger = createLogger('deleteTodo')
const uuidService = new UUIDService();

export async function handler(event) {
  logger.info('Delete Todo handler reached')
  const todoId = event.pathParameters.todoId

  if (!uuidService.isUUIDv4(todoId)) return createResponse({
    body: { message: 'Invalid path variable' },
    status: 400
  });

  const userId = parseUserIdFromHeader(event.headers.Authorization);

  await todos.deleteTodo(todoId, userId);

  logger.info('Returning a 200 response');
  return createResponse({
    body: { message: 'ok' },
  })
}

