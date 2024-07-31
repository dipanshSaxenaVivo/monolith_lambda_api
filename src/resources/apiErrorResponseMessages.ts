import { ResponseCodeEnum } from "models/enums";

/**
 * Mapping of response codes to detailed error messages for API responses.
 */
export const responseErrorMap = {
    [ResponseCodeEnum.BAD_ADD_USER_REQUEST]: "Invalid data provided for user creation.",
    [ResponseCodeEnum.EMAIL_NOT_VALID]: "Invalid email format.",
    [ResponseCodeEnum.ID_IS_REQUIRED]: "Unique identifier (ID) is required.",
    [ResponseCodeEnum.INTERNAL_SERVER_ERROR]: "An unexpected error occurred on the server.",
    [ResponseCodeEnum.INVALID_BODY]: "Request body is invalid or missing.",
    [ResponseCodeEnum.OK]: "OK",
    [ResponseCodeEnum.PHONE_NUMBER_NOT_VALID]: "Invalid phone number format.",
    [ResponseCodeEnum.RESOURCE_NOT_FOUND]: "Requested resource not found.",
    [ResponseCodeEnum.USER_EMAIL_REQUIRED]: "User email is mandatory.",
    [ResponseCodeEnum.USER_NAME_MAX_15]: "Username cannot exceed 15 characters.",
    [ResponseCodeEnum.USER_NAME_MIN_5]: "Username must be at least 5 characters long.",
    [ResponseCodeEnum.USER_NAME_REQUIRED]: "Username is required.",
    [ResponseCodeEnum.USER_ROLE_REQUIRED]: "User role is required."
  };
  