import { ResponseCodeEnum } from "models/enums";

/**
 * Mapping of response codes to detailed error messages for API responses.
 */
export const responseErrorMessage = {
  [ResponseCodeEnum.ID_IS_REQUIRED]: "Unique identifier (ID) is required.",
  [ResponseCodeEnum.USER_ALREADY_EXIST]: "User already exist.",
  [ResponseCodeEnum.USER_ID_NOT_EXIST]: "User id does not exist.",
  [ResponseCodeEnum.REQUIRED_FIELDS_NOT_GIVEN]: "These required fields are not given.",
};
