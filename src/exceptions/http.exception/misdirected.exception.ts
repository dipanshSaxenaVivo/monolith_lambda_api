import { HttpStatusCode, ResponseCodeEnum } from 'models/enums';
import { HttpException } from './index';
import { IError } from 'models/businessContracts';
import { createStandardError } from 'utility';
/**
 * Defines an HTTP exception for *Misdirected* type errors.
 *
 * @publicApi
 */
export class MisdirectedException extends HttpException {
  /**
   * Instantiate a `MisdirectedException` Exception.
   *
   * @example
   * `throw new MisdirectedException(ResponseCodeEnum.SOME_ERROR_CODE)`
   *
   * @usageNotes
   * The HTTP response status code will be 421.
   * 
   * The response will contain a standard error object created based on the provided response code.
   *
   * @param {ResponseCodeEnum} responseCode - Enum value representing the error code.
   * @param {string[]} [extra] - Optional additional error details.
   */
  constructor(
    responseCode: ResponseCodeEnum, 
    extra?: string[]
  ) {

    let ErrorObject = createStandardError(responseCode,extra)

    super(
      ErrorObject,
      HttpStatusCode.MISDIRECTED_REQUEST_421,
    );
  }
}
