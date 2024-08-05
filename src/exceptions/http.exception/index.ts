import { IError } from 'models/HandlerSpecificTypes';

export class HttpException extends Error {
  constructor(
    private readonly response: IError | undefined,
    private readonly status: number,
  ) {
    super();
    this.initMessage();
    this.initName();
  }

  public initMessage() {
    if (this.response && this.response.message) {
      this.message = this.response.message;
    } else if (this.constructor) {
      this.message =
        this.constructor.name.match(/[A-Z][a-z]+|[0-9]+/g)?.join(' ') ??
        'Error';
    }
  }

  public initName(): void {
    this.name = this.constructor.name;
  }

  public getResponse(): IError | undefined {
    return this.response;
  }

  public getStatus(): number {
    return this.status;
  }

}