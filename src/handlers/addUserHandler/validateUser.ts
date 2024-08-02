import { users } from "@prisma/client";
import {
  CreateFailure,
  CreateSuccess,
  IValidationResponse,
} from "models/apiResponses";
import { ResponseCodeEnum } from "models/enums";
import { IDatabaseClient } from "models/interface";
import { createStandardError, hasRequiredFields } from "utility";

export const validateUser = async (
  user: users,
  Prisma: IDatabaseClient
): Promise<IValidationResponse<users>> => {
  if (hasRequiredFields(user, "role", "email", "name") === false) {
    return CreateFailure(createStandardError(ResponseCodeEnum.INVALID_BODY));
  }

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
