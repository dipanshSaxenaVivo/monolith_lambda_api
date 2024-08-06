import { HttpStatusCode, ResponseCodeEnum } from 'models/enums';
import { HttpException } from './index';
import { createStandardError } from 'utility';

/**
 * Defines an HTTP exception for *Bad Gateway* type errors.
 *
 * @publicApi
 */
export class BadGatewayException extends HttpException {
  /**
   * Instantiate a `BadGatewayException` Exception.
   *
   * @example
   * `throw new BadGatewayException(ResponseCodeEnum.SOME_ERROR_CODE)`
   *
   * @usageNotes
   * The HTTP response status code will be 502.
   *
   * The response will contain a standard error object created based on the provided response code.
   *
   * @param responseCode {ResponseCodeEnum} - Enum value representing the error code.
   * @param extra {string[]} - Optional additional error details.
   */
  constructor(
    responseCode: ResponseCodeEnum, 
    extra?: string[]
  ) {
    let errorObject = createStandardError(responseCode, extra);
    super(
      errorObject,
      HttpStatusCode.BAD_GATEWAY_502,
    );
  }
}