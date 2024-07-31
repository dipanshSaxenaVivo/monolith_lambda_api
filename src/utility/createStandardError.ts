import { ResponseCodeEnum } from "models/enums";
import { responseErrorMap } from "resources";

/**
 * Creates a standard error object with the specified response code, message, and optional extra data.

 * @param {ResponseCodeEnum} responseCode - The error response code.
 * @param {any} extra - Optional extra data to include in the error object.
 * @returns {{ message: string; responseCode: ResponseCodeEnum; extra: any }} 
 *  The created error object.
 */
export const createStandardError = (
  responseCode: ResponseCodeEnum,
  extra?: any
): { message: string; responseCode: ResponseCodeEnum; extra: any } => ({
  message: responseErrorMap[responseCode],
  responseCode: responseCode,
  extra,
});
