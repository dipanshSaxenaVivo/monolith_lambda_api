import { APIGatewayProxyResult, Context } from "aws-lambda";
import { IDependencyContainer } from "models/interface";
import { APIHttpProxyEvent, LambdaHandlerType } from "models/types";
import { IResponse } from "models/interface";
import { HttpStatusCode } from "models/enums";
import { handleParseEvent } from "./handleParseEvent";

/**
 * Attaches a handler to process API Gateway events.
 *
 * This function wraps a normal handler function to work within an AWS Lambda context.
 * It parses the event body, invokes the provided handler, and formats the response
 * according to the result.
 *
 * @param {Function} businessHandler - The handler function to be wrapped and invoked.
 * @returns {LambdaHandlerType} An AWS Lambda handler function that processes the event and context.
 */
export const attachHandler =
  (
    businessHandler: (...args: any[]) => Promise<IResponse<any>>
  ): LambdaHandlerType =>
  async (
    DC: IDependencyContainer,
    event: APIHttpProxyEvent,
    context: Context
  ): Promise<APIGatewayProxyResult> => {
    let parsedBody = handleParseEvent(event, DC.logger);

    try {
      // return as it is
      let result = await businessHandler(DC, parsedBody);

      if (!result.success) {
        return {
          statusCode: HttpStatusCode.BAD_REQUEST_400,
          body: JSON.stringify(result.data),
        };
      }

      return {
        statusCode: HttpStatusCode.OK_200,
        body: JSON.stringify(result.data),
      };
    } catch (error) {
      return {
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR_500,
        body: JSON.stringify({
          message: "internal server error.",
        }),
      };
    }
  };
