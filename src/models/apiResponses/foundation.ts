import { ResponseCodeEnum } from "models/enums";

export type IValidationResponse<T> = successValidationResponse<T> | failureValidationResponse;

export interface successValidationResponse<T> {
  success: true;
  data: T;
}

export interface failureValidationResponse {
  success: false;
  data: IError;
}

export interface IError {
  responseCode: ResponseCodeEnum;
  message: string;
  extra?: string[];
}

export const CreateSuccess = <T>(data:T):successValidationResponse<T> => ({success: true, data: data})
export const CreateFailure = (data:IError):failureValidationResponse => ({success: false, data: data})