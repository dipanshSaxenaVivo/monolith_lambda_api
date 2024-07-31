import { APIGatewayProxyResult, Context } from "aws-lambda";
import { apply_middleware, validation_middleware } from "middleware";
import { Role } from "models/enums";
import { ResponseCodeEnum } from "models/enums";
import { IDependencyContainer } from "models/interface";
import { APIHttpProxyEvent, handlerType } from "models/types";
import { addUserSchema } from "schema";
import { addUserModel } from "schema/addUserSchema";
import { createStandardError } from "utility";

/**
 * Handles API requests to add a new user.
 *
 * Expects a POST request with JSON body containing 'email' and 'name' fields.
 *
 * @param {IDependencyContainer} DC The dependency container providing access to the database client.
 * @param {APIHttpProxyEvent} event The API Gateway HTTP proxy event object containing the request data.
 * @param {Context} context The AWS Lambda context object.
 * @returns {Promise<APIGatewayProxyResult>} A Promise resolving to an API Gateway Proxy Result object.
 */
const raw_add_user_handler = async (
  DC: IDependencyContainer,
  event: APIHttpProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  let body = event.body as unknown as addUserModel;
  try {
    let result = await DC.db_client.users.create({
      data: {
        email: body.email,
        name: body.name,
        phoneNumber: body.phoneNumber,
        role: body.role,
      },
    });
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `new user added`, user: result }),
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
export const add_user_handler:handlerType = apply_middleware(raw_add_user_handler, [
  validation_middleware(addUserSchema),
]);
