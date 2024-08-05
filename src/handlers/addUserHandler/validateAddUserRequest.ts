import { users } from "@prisma/client";
import {
  CreateFailure,
  CreateSuccess,
  IResponse,
} from "models/apiResponses";
import { ResponseCodeEnum } from "models/enums";
import { IDatabaseClient } from "models/interface";
import { addUserSchema } from "schema";
import { createStandardError, hasRequiredFields } from "utility";

export const validateAddUserRequest = async (
  user: users,
  Prisma: IDatabaseClient
): Promise<IResponse<users>> => {
  // if (hasRequiredFields(user, "role", "email", "name") === false) {
  //   return CreateFailure(createStandardError(ResponseCodeEnum.INVALID_BODY));
  // }

  let result = await addUserSchema.validate(user,{stripUnknown:true,abortEarly:true})
  console.log(result,'validation result')

  let userCount = await Prisma.users.count({
    where: {
      email: user.email,
      phoneNumber: user.phoneNumber ?? "",
    },
  });

  let doesUserExist = userCount > 0;

  if (doesUserExist) {
    return CreateFailure(
      createStandardError(ResponseCodeEnum.USER_ALREADY_EXIST)
    );
  }

  return CreateSuccess(user);
};
