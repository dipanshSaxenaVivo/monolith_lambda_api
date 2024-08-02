import { Role } from "models/enums";
import { ResponseCodeEnum } from "models/enums";
import { getAllKeysFromEnum } from "utility";
import yup from "yup";
import { idValidateSchema } from "./idValidateSchema";

export const updateUserSchema = idValidateSchema.concat(
  yup.object({
    email: yup.string().email(ResponseCodeEnum.EMAIL_NOT_VALID.toString()),
    name: yup
      .string()
      .min(5, ResponseCodeEnum.USER_NAME_MAX_15.toString())
      .max(15, ResponseCodeEnum.USER_NAME_MAX_15.toString()),
    phoneNumber: yup
      .string()
      .matches(
        /^(\+91|91)\s?\-?\d+/,
        ResponseCodeEnum.PHONE_NUMBER_NOT_VALID.toString()
      ),
    role: yup.mixed<Role>().oneOf(getAllKeysFromEnum(Role)),
  })
);

export type UpdateUserModel = yup.InferType<typeof updateUserSchema>;
