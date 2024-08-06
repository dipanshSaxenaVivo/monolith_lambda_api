import { BadRequestException } from "exceptions/http.exception/bad-request.exception";
import { NotFoundException } from "exceptions/http.exception/not-found.exception";
import {
  CreateFailure,
  CreateSuccess,
  IDeleteUserHandlerRequest,
  IResponse,
} from "models/HandlerSpecificTypes";
import { ResponseCodeEnum } from "models/enums";
import { IDatabaseClient } from "models/interface";
import { createStandardError, hasRequiredFields } from "utility";

/**
 * Validates the delete user request.
 *
 * This function checks if the required fields are present and whether the user exists
 * in the database. If the validation fails, it returns a failure response; otherwise,
 * it returns a success response with the validated userID.
 *
 * @param {IDeleteUserHandlerRequest} userID - The request object containing the
 * identifier of the user to be deleted.
 * @param {IDatabaseClient} Prisma - The database client used to interact with the
 * user data in the database.
 * @returns {Promise<IResponse<IDeleteUserHandlerRequest>>} A promise that resolves to an
 * IResponse object containing
 * either the validated userID or an error if validation fails.
 */
export const validateDeleteUserRequest = async (
  userID: IDeleteUserHandlerRequest,
  Prisma: IDatabaseClient
): Promise<IResponse<IDeleteUserHandlerRequest>> => {
  // validate required fields
  const notAvailableFields = hasRequiredFields(userID, "id");
  if (notAvailableFields.length > 0) {
    return CreateFailure(createStandardError(ResponseCodeEnum.ID_IS_REQUIRED));
  }

  let doesUserExist = await Prisma.users.findUnique({
    where: {
      id: userID.id,
    },
  });

  if (!Boolean(doesUserExist)) {
    throw new NotFoundException(ResponseCodeEnum.USER_ID_NOT_EXIST);
  }

  return CreateSuccess(userID);
};
