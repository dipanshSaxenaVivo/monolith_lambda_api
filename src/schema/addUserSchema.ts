import { Role } from "models/enums";
import { getAllKeysFromEnum } from "utility";
import yup from "yup";

export const addUserSchema = yup.object({
  email: yup.string().email().required("email is required"),
  name: yup.string().min(5).max(15).required("name is required"),
  phoneNumber: yup
    .string()
    .matches(/^(\+91|91)\s?\-?\d+/, "please enter valid phone number"),
  role: yup
    .mixed<Role>()
    .oneOf(getAllKeysFromEnum(Role))
    .required("RoleRequiredKey"),
});

export type addUserModel = yup.InferType<typeof addUserSchema>;