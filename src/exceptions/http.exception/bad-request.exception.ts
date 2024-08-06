import { HttpStatusCode, ResponseCodeEnum } from 'models/enums';
import { HttpException } from './index';
import { IError } from 'models/HandlerSpecificTypes';
import { createStandardError } from 'utility';

/**
 * Defines an HTTP exception for *Bad Request* type errors.
 *
 * @publicApi
 */
export class BadRequestException extends HttpException {
  /**
   * Instantiate a `BadRequestException` Exception.
   *
   * @example
   * `throw new BadRequestException(ResponseCodeEnum.INVALID_INPUT)`
   *
   * @usageNotes
   * The HTTP response status code will be 400.
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
    const ErrorObject = createStandardError(responseCode, extra);
    super(
      ErrorObject,
      HttpStatusCode.BAD_REQUEST_400,
    );
  }
}
