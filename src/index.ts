import { Context, APIGatewayProxyResult } from 'aws-lambda';
import { apply_kms, apply_console_logger, apply_prisma } from 'dependencies';
import { routeEnums } from 'models/enums';
import { APIHttpProxyEvent } from 'models/types';
import { route_container } from 'routes'

/**
 * Initializes and provides dependencies for route handlers.
 * 
 * The `injector` object is created by applying KMS and 
 * console logger dependencies.
 * 
 * This ensures that all route handlers have access to 
 * required services (e.g., logging and KMS).
 * 
 */
let injector_applied_logger_and_kms = apply_kms(apply_console_logger({} as any));
let injector = await apply_prisma(injector_applied_logger_and_kms)

/**
 * Main handler function for AWS Lambda, triggered by API Gateway events.
 * Routes the request to the appropriate handler  based on `event.rawPath`.
 * The `event.rawPath` is indexed on the `route_container`, which specifies the handler for each route.
 * 
 * @param {APIHttpProxyEvent} event - The event object from API Gateway, containing request details.
 * @param {Context} context - The context object provided by AWS Lambda.
 * @returns {Promise<APIGatewayProxyResult>} - The response object to be returned to API Gateway.
 * 
 */
export const handler = async (event: APIHttpProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
  injector.logger.log(event)
  if (!(event.rawPath in route_container)) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Resource not found' }),
    }
  }
  try {
    const result = await route_container[event.rawPath as routeEnums](injector, event, context)
    return result;
  } catch (error) {
    injector.logger.error('Error handling request:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};
