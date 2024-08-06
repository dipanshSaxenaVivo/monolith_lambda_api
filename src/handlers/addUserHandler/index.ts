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
 * Handles the process of adding a new user.
 *
 * This function validates the request, 
 * adds the user to the database, 
 * and returns a success or failure response.
 *
 * @param {IDependencyContainer} DC - The dependency container providing access to 
 * necessary services like the database client.
 * @param {IAddUserHandlerRequest} userToAdd - The request object containing the details 
 * of the user to be added.
 * @returns {Promise<IResponse<IAddUserHandlerResponse>>} A promise that resolves to an 
 * IResponse object containing either the added user details or an error.
 */
export const addUserHandler = async (
  DC: IDependencyContainer,
  userToAdd: IAddUserHandlerRequest
): Promise<IResponse<IAddUserHandlerResponse>> => {
  let validationResult = await validateAddUserRequest(userToAdd, DC.db_client);

  if (!validationResult.success) {
    return CreateFailure(validationResult.data);
  }

  let addedUser = await addUser(validationResult.data, DC.db_client);

  return CreateSuccess(addedUser);
};
