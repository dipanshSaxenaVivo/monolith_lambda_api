import { HttpStatusCode, ResponseCodeEnum } from 'models/enums';
import { HttpException } from './index';
import { IError } from 'models/HandlerSpecificTypes';
import { createStandardError } from 'utility';
/**
 * Defines an HTTP exception for *Unprocessable Entity* type errors.
 *
 * @publicApi
 */
export class UnprocessableEntityException extends HttpException {
  /**
   * Instantiate an `UnprocessableEntityException` Exception.
   *
   * @example
   * `throw new UnprocessableEntityException(ResponseCodeEnum.SOME_ERROR_CODE)`
   *
   * @usageNotes
   * The HTTP response status code will be 422.
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
      HttpStatusCode.UNPROCESSABLE_ENTITY_422,
    );
  }
}
