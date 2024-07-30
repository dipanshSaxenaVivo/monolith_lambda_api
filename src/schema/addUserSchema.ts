import { Role } from "models/enums";
import { ResponseCodeEnum } from "models/enums";
import { getAllKeysFromEnum } from "utility";
import yup from "yup";

export const addUserSchema = yup.object({
  email: yup
    .string()
    .email(ResponseCodeEnum.EMAIL_NOT_VALID.toString())
    .required(ResponseCodeEnum.USER_EMAIL_REQUIRED.toString()),
  name: yup
    .string()
    .min(5, ResponseCodeEnum.USER_NAME_MAX_15.toString())
    .max(15, ResponseCodeEnum.USER_NAME_MAX_15.toString())
    .required(ResponseCodeEnum.USER_NAME_REQUIRED.toString()),
  phoneNumber: yup
    .string()
    .matches(
      /^(\+91|91)\s?\-?\d+/,
      ResponseCodeEnum.PHONE_NUMBER_NOT_VALID.toString()
    ),
  role: yup
    .mixed<Role>()
    .oneOf(getAllKeysFromEnum(Role))
    .required(ResponseCodeEnum.USER_ROLE_REQUIRED.toString()),
});

export type addUserModel = yup.InferType<typeof addUserSchema>;
