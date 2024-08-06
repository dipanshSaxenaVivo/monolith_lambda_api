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
 * Handles the process of deleting a user.
 *
 * This function validates the delete request,
 * deletes the user from the database if the request is valid,
 * and returns a success or failure response.
 *
 * @param {IDependencyContainer} DC - The dependency container providing access to
 * necessary services like the database client.
 * @param {IDeleteUserHandlerRequest} userID - The request object containing the
 * identifier of the user to be deleted.
 * @returns {Promise<IResponse<IDeleteUserHandlerResponse>>} A promise that resolves to an
 * IResponse object containing either an empty response on success or an error on failure.
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
