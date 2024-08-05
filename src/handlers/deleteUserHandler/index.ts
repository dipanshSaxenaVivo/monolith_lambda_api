import { IDependencyContainer } from "models/interface";
import { validateDeleteUserRequest } from "./validateDeleteUserRequest";
import { deleteUser } from "./deleteHandler";
import {
  CreateFailure,
  CreateSuccess,
  IDeleteUserHandlerRequest,
  IDeleteUserHandlerResponse,
  IResponse,
} from "models/HandlerSpecificTypes";

/**
 * Handles API requests to delete a user.
 * Expects a POST request containing a JSON body with the 'id' field.
 *
 * @param {IDependencyContainer} DC The dependency container providing access to the database client.
 * @param {IDeleteUserHandlerRequest} userID user's Object id.
 * @returns {Promise<APIResponse<IDeleteUserHandlerResponse>>} A Promise resolving to an empty object.
 */
export const deleteUserHandler = async (
  DC: IDependencyContainer,
  userID: IDeleteUserHandlerRequest
): Promise<IResponse<IDeleteUserHandlerResponse>> => {
  let validationResult = await validateDeleteUserRequest(userID, DC.db_client);

  if (validationResult.success === false) {
    return CreateFailure(validationResult.data);
  }

  await deleteUser(userID, DC.db_client);

  return CreateSuccess({});
};
