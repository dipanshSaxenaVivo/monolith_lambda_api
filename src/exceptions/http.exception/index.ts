import { IError } from 'models/HandlerSpecificTypes';

/**
 * Base class for HTTP exceptions.
 * 
 * This class is used to create HTTP exceptions with a specific status code and response object.
 */
export class HttpException extends Error {
  /**
   * Creates an instance of HttpException.
   *
   * @param {IError | undefined} response - The error response object containing error details.
   * @param {number} status - The HTTP status code associated with the error.
   */
  constructor(
    private readonly response: IError | undefined,
    private readonly status: number,
  ) {
    super();
    this.initMessage();
    this.initName();
  }

  /**
   * Initializes the error message based on the response object or class name.
   */
  public initMessage() {
    if (this.response && this.response.message) {
      this.message = this.response.message;
    } else if (this.constructor) {
      this.message =
        this.constructor.name.match(/[A-Z][a-z]+|[0-9]+/g)?.join(' ') ??
        'Error';
    }
  }

  /**
   * Initializes the error name based on the class name.
   */
  public initName(): void {
    this.name = this.constructor.name;
  }

  /**
   * Returns the response object associated with the exception.
   *
   * @returns {IError | undefined} The error response object.
   */
  public getResponse(): IError | undefined {
    return this.response;
  }

  /**
   * Returns the HTTP status code associated with the exception.
   *
   * @returns {number} The HTTP status code.
   */
  public getStatus(): number {
    return this.status;
  }
}