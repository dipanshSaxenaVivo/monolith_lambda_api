import { ResponseCodeEnum } from "models/enums";

export type IResponse<T> = successResponse<T> | failureResponse;

export interface successResponse<T> {
  success: true;
  data: T;
}

export interface failureResponse {
  success: false;
  data: IError;
}

export interface IError {
  responseCode: ResponseCodeEnum;
  message: string;
  extra?: string[];
}

export const CreateSuccess = <T>(data:T):successResponse<T> => ({success: true, data: data})
export const CreateFailure = (data:IError):failureResponse => ({success: false, data: data})