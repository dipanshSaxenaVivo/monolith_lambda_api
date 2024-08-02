import { Prisma } from "@prisma/client";
import { HttpStatusCode, ResponseCodeEnum } from "models/enums";
import { HandlerType } from "models/types";
import { createStandardError } from "utility";

export const errorCatcher = <T>(Func: HandlerType<T>): HandlerType<T> => {
  return async (DC, event, context) => {
    try {
      return await Func(DC, event, context);
    } catch (error) {
      DC.logger.log(JSON.stringify(error));

      // handles prisma client knows errors
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          return {
            statusCode: HttpStatusCode.CONFLICT_409,
            body: createStandardError(error.code as any),
          };
        }

        return {
          statusCode: HttpStatusCode.BAD_REQUEST_400,
          body: createStandardError(error.code as any),
        };
      }

      if(error instanceof Prisma.PrismaClientValidationError){
        return {
          statusCode: HttpStatusCode.BAD_REQUEST_400,
          body: {
            message:error.message,
            responseCode:ResponseCodeEnum.INVALID_BODY
          },
        };
      }

      return {
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR_500,
        body: createStandardError(ResponseCodeEnum.INTERNAL_SERVER_ERROR),
      };
    }
  };
};
