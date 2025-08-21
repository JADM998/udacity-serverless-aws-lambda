import { parseUserIdFromHeader } from '../../auth/utils.mjs'
import { Todos } from '../../businessLayer/todos.mjs'
import { createResponse } from '../../utils/lambdaResponse.mjs'
import { createLogger } from '../../utils/logger.mjs';

const todos = new Todos();
const logger = createLogger('generateUploadUrl Handler')

export async function handler(event) {
  logger.info('reached Generate Upload URL Handler')
  const todoId = event.pathParameters.todoId
  const userId = parseUserIdFromHeader(event.headers.Authorization);

  const signedlUploadUrl = await todos.generateImageUploadUrl(todoId, userId);

  logger.info('returning a 200 response');
  return createResponse({
    body: {uploadUrl: signedlUploadUrl},
  })
}

