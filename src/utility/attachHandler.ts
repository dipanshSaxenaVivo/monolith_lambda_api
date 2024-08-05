import { APIGatewayProxyResult, Context } from "aws-lambda";
import { IDependencyContainer } from "models/interface";
import { APIHttpProxyEvent } from "models/types";
import { parseEventBody } from "./common";
import { IResponse } from "models/HandlerSpecificTypes";
import { HttpStatusCode } from "models/enums";

export const attachHandler =
  (someNormalHandler: (...args: any[]) => Promise<IResponse<any>>) =>
  async (
    DC: IDependencyContainer,
    event: APIHttpProxyEvent,
    context: Context
  ): Promise<APIGatewayProxyResult> => {
    let parsedBody = parseEventBody(event.body);
    // let queries = event.queryStringParameters;

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
