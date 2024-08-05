import { users } from "@prisma/client";
import { Context } from "aws-lambda";
import { IAddUserHandlerResponse } from "models/apiResponses";
import { IDependencyContainer } from "models/interface";
import { APIHttpProxyEvent, APIResponse } from "models/types";
import { parseEventBody } from "utility/common";
import { validateAddUserRequest } from "./validateAddUserRequest";
import { addUser } from "./addUser";
import { errorCatcher } from "utility";
import { HttpStatusCode } from "models/enums";

/**
 * Handles API requests to add a new user.
 *
 * Expects a POST request with JSON body containing 'email' and 'name' fields.
 *
 * @param {IDependencyContainer} DC The dependency container providing access to the database client.
 * @param {users} userToAdd User's information.
 * @returns {Promise<APIResponse<IAddUserHandlerResponse>>} A Promise resolving to an API Gateway Proxy Result object.
 */
export const addUserHandler = async (
  DC: IDependencyContainer,
  userToAdd: users,
): Promise<APIResponse<IAddUserHandlerResponse>> => {
  let validationResult = await validateAddUserRequest(userToAdd, DC.db_client);

  if (!validationResult.success) {
    return {
      statusCode: HttpStatusCode.BAD_REQUEST_400,
      body: validationResult.data,
    };
  }

  let addedUser = await addUser(validationResult.data, DC.db_client);

  return {
    statusCode: HttpStatusCode.OK_200,
    body: { user: addedUser },
  };
};
