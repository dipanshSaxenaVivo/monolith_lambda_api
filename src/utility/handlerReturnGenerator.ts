import { ResponseCodeEnum } from "models/enums";

export const handlerErrorReturn = (responseCode: ResponseCodeEnum, extra?: any) => ({
  message: ResponseCodeEnum[responseCode],
  responseCode: responseCode,
  body: extra ? extra : [].toString()
})