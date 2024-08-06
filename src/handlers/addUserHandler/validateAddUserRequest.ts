import { ConflictException } from "exceptions/http.exception/conflict.exception";
import {
  CreateFailure,
  CreateSuccess,
  IAddUserHandlerRequest,
  IResponse,
} from "models/HandlerSpecificTypes";
import { ResponseCodeEnum } from "models/enums";
import { IDatabaseClient } from "models/interface";
import { createStandardError, hasRequiredFields } from "utility";

/**
 * Validates the request to add a new user.
 *
 * This function checks if the required fields are present and if the user already exists in the database.
 * If the validation passes, it returns a success response; otherwise, it returns a failure response.
 *
 * @param {IAddUserHandlerRequest} user - The user details to validate.
 * @param {IDatabaseClient} Prisma - The database client instance for interacting with the database.
 * @returns {Promise<IResponse<IAddUserHandlerRequest>>} A promise that resolves to a validation response.
 */
export const validateAddUserRequest = async (
  user: IAddUserHandlerRequest,
  Prisma: IDatabaseClient
): Promise<IResponse<IAddUserHandlerRequest>> => {
  // validate required fields
  const notAvailableFields = hasRequiredFields(user, "email", "name", "role");
  if (notAvailableFields.length > 0) {
    return CreateFailure(
      createStandardError(
        ResponseCodeEnum.REQUIRED_FIELDS_NOT_GIVEN,
        notAvailableFields
      )
    );
  }

  let userCount = await Prisma.users.count({
    where: {
      email: user.email,
      phoneNumber: user.phoneNumber ?? "",
    },
  });

  let doesUserExist = userCount > 0;

  if (doesUserExist) {
    throw new ConflictException(ResponseCodeEnum.USER_ALREADY_EXIST);
  }

  return CreateSuccess(user);
};
