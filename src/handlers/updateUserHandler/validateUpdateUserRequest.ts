import { users } from "@prisma/client";
import {
  CreateFailure,
  CreateSuccess,
  IResponse,
} from "models/apiResponses";
import { ResponseCodeEnum } from "models/enums";
import { IDatabaseClient } from "models/interface";
import { addUserSchema, updateUserSchema } from "schema";
import { createStandardError, hasRequiredFields } from "utility";

export const validateUpdateUserRequest = async (
  user: users,
  Prisma: IDatabaseClient
): Promise<IResponse<users>> => {

  let result = await updateUserSchema.validate(user,{stripUnknown:true,abortEarly:true})
  console.log(result,'validation result')

  let doesUserExist = await Prisma.users.findUnique({
    where: {
      id:user.id
    },
  });

  if (!Boolean(doesUserExist)) {
    return CreateFailure(
      createStandardError(ResponseCodeEnum.USER_ID_NOT_EXIST)
    );
  }

  return CreateSuccess(user);
};
