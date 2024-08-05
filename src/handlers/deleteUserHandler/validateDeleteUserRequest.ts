import { CreateFailure, CreateSuccess } from "models/apiResponses";
import { ResponseCodeEnum } from "models/enums";
import { IDatabaseClient } from "models/interface";
import { IdValidateModel, idValidateSchema } from "schema/idValidateSchema";
import { createStandardError } from "utility";

export const validateDeleteUserRequest = async (
  user: IdValidateModel,
  Prisma: IDatabaseClient
) => {
  let result = await idValidateSchema.validate(user,{stripUnknown:true,abortEarly:true});
  console.log(result, "validation result");

  let doesUserExist = await Prisma.users.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!Boolean(doesUserExist)) {
    return CreateFailure(
      createStandardError(ResponseCodeEnum.USER_ID_NOT_EXIST)
    );
  }

  return CreateSuccess(user);
};
