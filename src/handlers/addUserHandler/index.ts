import {
  CreateFailure,
  CreateSuccess,
  IAddUserHandlerRequest,
  IAddUserHandlerResponse,
  IResponse,
} from "models/HandlerSpecificTypes";
import { IDependencyContainer } from "models/interface";
import { validateAddUserRequest } from "./validateAddUserRequest";
import { addUser } from "./addUser";

/**
 * Handles API requests to add a new user.
 *
 * Expects a POST request with JSON body containing 'email' and 'name' fields.
 *
 * @param {IDependencyContainer} DC The dependency container providing access to the database client.
 * @param {IAddUserHandlerRequest} userToAdd User's information.
 * @returns {Promise<APIResponse<IAddUserHandlerResponse>>} A Promise resolving to an API Gateway Proxy Result object.
 */
export const addUserHandler = async (
  DC: IDependencyContainer,
  userToAdd: IAddUserHandlerRequest
): Promise<IResponse<IAddUserHandlerResponse>> => {
  let validationResult = await validateAddUserRequest(userToAdd, DC.db_client);

  if (validationResult.success == false) {
    return CreateFailure(validationResult.data);
  }

  let addedUser = await addUser(validationResult.data, DC.db_client);

  return CreateSuccess(addedUser);
};
