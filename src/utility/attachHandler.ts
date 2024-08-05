import { APIGatewayProxyResult, Context } from "aws-lambda";
import { IDependencyContainer } from "models/interface";
import { APIHttpProxyEvent } from "models/types";
import { parseEventBody } from "./common";

export const attachHandler = (someNormalHandler: any) => async (DC: IDependencyContainer, event: APIHttpProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
  let parsedBody = parseEventBody(event.body);
  let queries = event.queryStringParameters

  let result = await someNormalHandler(DC,parsedBody,queries)

  return {
    ...result,
    body: JSON.stringify(result.body),
  };
}