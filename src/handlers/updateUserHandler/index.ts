import {
  CreateFailure,
  CreateSuccess,
  IResponse,
  IUpdateUserHandlerRequest,
  IUpdateUserHandlerResponse,
} from "models/HandlerSpecificTypes";
import { IDependencyContainer } from "models/interface";
import { validateUpdateUserRequest } from "./validateUpdateUserRequest";
import { updateUser } from "./updateUser";
import { BadRequestException } from "exceptions/http.exception/bad-request.exception";

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
  userData: IUpdateUserHandlerRequest
): Promise<IResponse<IUpdateUserHandlerResponse>> => {
  let validationResult = await validateUpdateUserRequest(
    userData,
    DC.db_client
  );

  if (validationResult.success === false) {
    return CreateFailure(validationResult.data);
  }

  let updatedUser = await updateUser(userData, DC.db_client);

  return CreateSuccess(updatedUser);
};
