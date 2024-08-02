import { users } from "@prisma/client";
import { Context } from "aws-lambda";
import { IAddUserHandlerResponse } from "models/apiResponses";
import { ResponseCodeEnum } from "models/enums";
import { IDependencyContainer } from "models/interface";
import { APIHttpProxyEvent, APIResponse } from "models/types";
import { addUserSchema } from "schema";
import { AddUserModel } from "schema/addUserSchema";
import { createStandardError } from "utility";
import { parseEventBody } from "utility/common";
import { validateUser } from "./validateUser";
import { addUser } from "./addUser";

/**
 * Handles API requests to add a new user.
 *
 * Expects a POST request with JSON body containing 'email' and 'name' fields.
 *
 * @param {IDependencyContainer} DC The dependency container providing access to the database client.
 * @param {APIHttpProxyEvent} event The API Gateway HTTP proxy event object containing the request data.
 * @param {Context} context The AWS Lambda context object.
 * @returns {Promise<APIResponse<IAddUserHandlerResponse>>} A Promise resolving to an API Gateway Proxy Result object.
 */
export const addUserHandler = async (
  DC: IDependencyContainer,
  event: APIHttpProxyEvent,
  context: Context
): Promise<APIResponse<IAddUserHandlerResponse>> => {
  let body = event.body;
  try {
    let parsedBody = parseEventBody<users>(body);
    let validationResult = await validateUser(parsedBody, DC.db_client);
    if (!validationResult.success) {
      return {
        statusCode: 400,
        body: validationResult.data,
      };
    }
    let addedUser = await addUser(validationResult.data, DC.db_client);
    return {
      statusCode: 200,
      body: { user: addedUser },
    };
  } catch (error) {
    DC.logger.error(error);
    return {
      statusCode: 500,
      body: createStandardError(ResponseCodeEnum.INTERNAL_SERVER_ERROR),
    };
  }
};
