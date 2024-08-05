import { Prisma } from "@prisma/client";
import { Context, APIGatewayProxyResult } from "aws-lambda";
import { applyKms, applyConsoleLogger, applyPrisma } from "dependencies";
import { HttpException } from "exceptions/http.exception";
import { RouteEnums, ResponseCodeEnum, HttpStatusCode } from "models/enums";
import { APIHttpProxyEvent } from "models/types";
import { ROUTE_CONTAINER } from "routes";
import { createStandardError } from "utility";
;

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
let injector = applyKms(applyConsoleLogger({} as any));

/**
 * we store our connection string in environment variable of lambda and we encrypt it via a kms key,
 * so, we would have to decrypt our connection string before using it.
 */
let decryptedEnvString =
  await injector.cryptography.getEnvironmentVariable(
    "MONGO_DB_URI_ENC"
  );
if (decryptedEnvString) {
  injector = applyPrisma(injector, decryptedEnvString);
}

/**
 * Main handler function for AWS Lambda, triggered by API Gateway events.
 * Routes the request to the appropriate handler  based on `event.rawPath`.
 * The `event.rawPath` is indexed on the `ROUTE_CONTAINER`, which specifies the handler for each route.
 *
 * @param {APIHttpProxyEvent} event - The event object from API Gateway, containing request details.
 * @param {Context} context - The context object provided by AWS Lambda.
 * @returns {Promise<APIGatewayProxyResult>} - The response object to be returned to API Gateway.
 *
 */
export const handler = async (
  event: APIHttpProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  injector.logger.log(
    "event object %s,\n context object %O",
    JSON.stringify(event),
    context
  );

  // Check if the route exists in the route container
  if (!(event.rawPath in ROUTE_CONTAINER)) {
    return {
      statusCode: HttpStatusCode.NOT_FOUND_404,
      body: JSON.stringify(createStandardError(ResponseCodeEnum.RESOURCE_NOT_FOUND)),
    };
  }
  try {
    // Get the route handler for the given path
    const routeHandler = ROUTE_CONTAINER[event.rawPath];

    // Execute the route handler and return its result
    const result = await routeHandler(injector, event, context);

    return result;
  } catch (error) {
    injector.logger.log(error,JSON.stringify(error));

    // handles prisma client knows errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        statusCode: HttpStatusCode.BAD_REQUEST_400,
        body: JSON.stringify(createStandardError(error.code as any)),
      };
    }

    // handles prisma validation errors
    if (error instanceof Prisma.PrismaClientValidationError) {
      return {
        statusCode: HttpStatusCode.BAD_REQUEST_400,
        body: JSON.stringify(createStandardError(ResponseCodeEnum.INVALID_BODY)),
      };
    }

    if(error instanceof HttpException){
      return {
        statusCode: error.getStatus(),
        body: JSON.stringify(error.getResponse() ?? "{}")
      }
    }

    // base error for internal server error 500
    return {
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR_500,
      body: JSON.stringify(createStandardError(ResponseCodeEnum.INTERNAL_SERVER_ERROR)),
    };
  }
};
