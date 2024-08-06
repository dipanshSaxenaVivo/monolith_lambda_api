import { APIGatewayProxyResult, Context } from "aws-lambda";
import { IDependencyContainer } from "models/interface";
import { APIHttpProxyEvent, HandlerType } from "models/types";
import { IResponse } from "models/HandlerSpecificTypes";
import { HttpStatusCode } from "models/enums";

/**
 * Attaches a handler to process API Gateway events.
 *
 * This function wraps a normal handler function to work within an AWS Lambda context.
 * It parses the event body, invokes the provided handler, and formats the response
 * according to the result.
 *
 * @param {Function} someNormalHandler - The handler function to be wrapped and invoked.
 * @returns {Function} An AWS Lambda handler function that processes the event and context.
 */
export const attachHandler =
  (someNormalHandler: (...args: any[]) => Promise<IResponse<any>>) =>
    async (
      DC: IDependencyContainer,
      event: APIHttpProxyEvent,
      context: Context
    ): Promise<APIGatewayProxyResult> => {

      let parsedBody = JSON.parse(event.body ?? "{}")

      let result = await someNormalHandler(DC, parsedBody);

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
    };
