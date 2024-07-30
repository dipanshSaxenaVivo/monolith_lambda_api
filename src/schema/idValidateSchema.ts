import { ResponseCodeEnum } from "models/enums";
import yup from "yup";

export const idValidateSchema = yup.object({
  id: yup
    .string().required(ResponseCodeEnum.ID_IS_REQUIRED.toString()),
});

export type idValidateModel = yup.InferType<typeof idValidateSchema>;
