import { HttpStatusCode } from "models/enums";
import { IDependencyContainer } from "models/interface";
import { APIResponse } from "models/types";
import { IdValidateModel } from "schema/idValidateSchema";
import { validateDeleteUserRequest } from "./validateDeleteUserRequest";
import { deleteUser } from "./deleteHandler";

/**
 * Handles API requests to delete a user.
 * Expects a POST request containing a JSON body with the 'id' field.
 *
 * @param {IDependencyContainer} DC The dependency container providing access to the database client.
 * @param {{id:string}} userID user's Object id.
 * @returns {Promise<APIResponse<{}>>} A Promise resolving to an empty object.
 */
export const deleteUserHandler = async (
  DC: IDependencyContainer,
  userID: IdValidateModel
): Promise<APIResponse<{}>> => {
  let validationResult = await validateDeleteUserRequest(userID, DC.db_client);

  if (!validationResult.success) {
    return {
      statusCode: HttpStatusCode.BAD_REQUEST_400,
      body: validationResult.data,
    };
  }

  await deleteUser(userID, DC.db_client);

  return {
    statusCode: HttpStatusCode.NO_CONTENT_204,
    body: {},
  };
};
