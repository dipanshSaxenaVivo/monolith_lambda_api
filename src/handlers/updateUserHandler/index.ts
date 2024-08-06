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

/**
 * Handles the process of updating a user's information.
 *
 * This function validates the update request, 
 * updates the user details in the database, 
 * and returns a success or failure response.
 *
 * @param {IDependencyContainer} DC - The dependency container providing access to 
 * necessary services like the database client.
 * @param {IUpdateUserHandlerRequest} userData - The request object containing the updated user details.
 * @returns {Promise<IResponse<IUpdateUserHandlerResponse>>} A promise that resolves to an 
 * IResponse object containing either the updated user details or an error.
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
