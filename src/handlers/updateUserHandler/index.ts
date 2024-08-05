import * as Prisma from "@prisma/client";
import { IUpdateUserHandlerResponse } from "models/apiResponses";
import { HttpStatusCode } from "models/enums";
import { IDependencyContainer } from "models/interface";
import { APIResponse } from "models/types";
import { validateUpdateUserRequest } from "./validateUpdateUserRequest";
import { updateUser } from "./updateUser";

/**
 * Handles API requests to update a user.
 * Expects a POST request containing a JSON body with the 'id' field, and optional email and name fields.
 *
 * @param {IDependencyContainer} DC The dependency container providing access to the database client.
 * @param {users} userData User's information.
 * @returns {Promise<APIGatewayProxyResult>} A Promise resolving to an API Gateway Proxy Result object.
 */
export const updateUserHandler = async (
  DC: IDependencyContainer,
  userData: Prisma.users
): Promise<APIResponse<IUpdateUserHandlerResponse>> => {
  let validationResult = await validateUpdateUserRequest(userData, DC.db_client);

  if (!validationResult.success) {
    return {
      statusCode: HttpStatusCode.BAD_REQUEST_400,
      body: validationResult.data,
    };
  }

  let addedUser = await updateUser(userData, DC.db_client)

  return {
    statusCode: HttpStatusCode.OK_200,
    body: { user: addedUser },
  };
}