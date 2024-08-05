import { NotFoundException } from "exceptions/http.exception/not-found.exception";
import {
  CreateFailure,
  CreateSuccess,
  IResponse,
  IUpdateUserHandlerRequest,
} from "models/HandlerSpecificTypes";
import { ResponseCodeEnum } from "models/enums";
import { IDatabaseClient } from "models/interface";
import { createStandardError, hasRequiredFields } from "utility";

export const validateUpdateUserRequest = async (
  user: IUpdateUserHandlerRequest,
  Prisma: IDatabaseClient
): Promise<IResponse<IUpdateUserHandlerRequest>> => {
  // validate required fields
  const notAvailableFields = hasRequiredFields(user, "id");
  if (notAvailableFields.length > 0) {
    return CreateFailure(
      createStandardError(
        ResponseCodeEnum.ID_IS_REQUIRED
      )
    );
  }

  let doesUserExist = await Prisma.users.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!Boolean(doesUserExist)) {
    throw new NotFoundException(ResponseCodeEnum.USER_ID_NOT_EXIST);
  }

  return CreateSuccess(user);
};
