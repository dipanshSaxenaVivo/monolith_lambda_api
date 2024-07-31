import * as Prisma from "@prisma/client";
import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { apply_middleware, validation_middleware } from "middleware";
import { ResponseCodeEnum } from "models/enums";
import { IDependencyContainer } from "models/interface";
import { APIHttpProxyEvent } from "models/types";
import { idValidateSchema } from "schema";
import { idValidateModel } from "schema/idValidateSchema";
import { createStandardError, hasRequiredFields } from "utility";

/**
 * Handles API requests to delete a user.
 * Expects a POST request containing a JSON body with the 'id' field.
 *
 * @param {IDependencyContainer} DC The dependency container providing access to the database client.
 * @param {APIHttpProxyEvent} event The API Gateway HTTP proxy event object containing the request data.
 * @param {Context} context The AWS Lambda context object.
 * @returns {Promise<APIGatewayProxyResult>} A Promise resolving to an API Gateway Proxy Result object.
 */
const raw_delete_user_handler = async (
  DC: IDependencyContainer,
  event: APIHttpProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  let body = event.body as unknown as idValidateModel;
  try {
    const result = await DC.db_client.users.delete({
      where: {
        id: body.id,
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `deleted user successfully`,
        user: result,
      }),
    };
  } catch (error) {
    DC.logger.error(error)
    return {
      statusCode: 500,
      body: JSON.stringify(createStandardError(ResponseCodeEnum.INTERNAL_SERVER_ERROR)),
    };
  }
};

/**
 * Combines the handler with the necessary middlewares.
 * 
 * @type {handlerType}
 */
export const delete_user_handler = apply_middleware(raw_delete_user_handler, [
  validation_middleware(idValidateSchema)
])
