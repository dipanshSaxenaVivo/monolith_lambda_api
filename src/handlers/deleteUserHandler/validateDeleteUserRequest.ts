import { BadRequestException } from "exceptions/http.exception/bad-request.exception";
import { NotFoundException } from "exceptions/http.exception/not-found.exception";
import {
  CreateFailure,
  CreateSuccess,
  IDeleteUserHandlerRequest,
  IResponse,
} from "models/HandlerSpecificTypes";
import { ResponseCodeEnum } from "models/enums";
import { IDatabaseClient } from "models/interface";
import { createStandardError, hasRequiredFields } from "utility";

export const validateDeleteUserRequest = async (
  userID: IDeleteUserHandlerRequest,
  Prisma: IDatabaseClient
): Promise<IResponse<IDeleteUserHandlerRequest>> => {
  // validate required fields
  const notAvailableFields = hasRequiredFields(userID, "id");
  if (notAvailableFields.length > 0) {
    return CreateFailure(
      createStandardError(
        ResponseCodeEnum.ID_IS_REQUIRED
      )
    );
  }

  let doesUserExist = await Prisma.users.findUnique({
    where: {
      id: userID.id,
    },
  });

  if (!Boolean(doesUserExist)) {
    throw new NotFoundException(ResponseCodeEnum.USER_ID_NOT_EXIST);
  }

  return CreateSuccess(userID);
};
