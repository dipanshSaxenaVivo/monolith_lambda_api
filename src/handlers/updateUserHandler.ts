import * as Prisma from "@prisma/client";
import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { apply_middleware, validation_middleware } from "middleware";
import { ResponseCodeEnum } from "models/enums";
import { IDependencyContainer } from "models/interface";
import { APIHttpProxyEvent } from "models/types";
import { updateUserSchema } from "schema";
import { updateUserModel } from "schema/updateUserSchema";
import { createStandardError, hasRequiredFields } from "utility";

/**
 * Handles API requests to update a user.
 * Expects a POST request containing a JSON body with the 'id' field, and optional email and name fields.
 *
 * @param {IDependencyContainer} DC The dependency container providing access to the database client.
 * @param {APIHttpProxyEvent} event The API Gateway HTTP proxy event object containing the request data.
 * @param {Context} context The AWS Lambda context object.
 * @returns {Promise<APIGatewayProxyResult>} A Promise resolving to an API Gateway Proxy Result object.
 */
const raw_update_user_handler = async (
  DC: IDependencyContainer,
  event: APIHttpProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  let body = event.body as unknown as updateUserModel;
  try {
    let { id, ...restBody } = body;
    const result = await DC.db_client.users.update({
      where: {
        id: id,
      },
      data: restBody,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `updated user successfully`,
        user: result,
      }),
    };
  } catch (error) {
    DC.logger.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify(
        createStandardError(ResponseCodeEnum.INTERNAL_SERVER_ERROR)
      ),
    };
  }
};

/**
 * Combines the handler with the necessary middlewares.
 * 
 * @type {handlerType}
 */
export const update_user_handler = apply_middleware(raw_update_user_handler, [
  validation_middleware(updateUserSchema),
]);
