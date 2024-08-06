import { NotFoundException } from "exceptions/http.exception/not-found.exception";
import {
  CreateFailure,
  CreateSuccess,
  IResponse,
  IUpdateUserHandlerRequest,
} from "models/HandlerSpecificTypes";
import { ResponseCodeEnum } from "models/enums";
import { IDatabaseClient } from "models/interface";
import { createStandardError, hasRequiredFields } from "utility";

/**
 * Validates the update user request.
 *
 * This function checks if the required fields are present and whether the user exists
 * in the database. If the validation fails, it returns a failure response; otherwise,
 * it returns a success response with the validated user data.
 *
 * @param {IUpdateUserHandlerRequest} user - The request object containing the details 
 * of the user to be updated.
 * @param {IDatabaseClient} Prisma - The database client used to interact 
 * with the user data in the database.
 * @returns {Promise<IResponse<IUpdateUserHandlerRequest>>} A promise that resolves to an 
 * IResponse object containing
 * either the validated user data or an error if validation fails.
 */
export const validateUpdateUserRequest = async (
  user: IUpdateUserHandlerRequest,
  Prisma: IDatabaseClient
): Promise<IResponse<IUpdateUserHandlerRequest>> => {
  // validate required fields
  const notAvailableFields = hasRequiredFields(user, "id");
  if (notAvailableFields.length > 0) {
    return CreateFailure(createStandardError(ResponseCodeEnum.ID_IS_REQUIRED));
  }

  let doesUserExist = await Prisma.users.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!Boolean(doesUserExist)) {
    throw new NotFoundException(ResponseCodeEnum.USER_ID_NOT_EXIST);
  }

  return CreateSuccess(user);
};
