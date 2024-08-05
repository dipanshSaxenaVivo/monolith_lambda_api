import {
  APIGatewayEventRequestContextLambdaAuthorizer,
  APIGatewayEventRequestContextV2WithAuthorizer,
  APIGatewayProxyEventV2WithRequestContext,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { IError } from "models/HandlerSpecificTypes";
import { IDependencyContainer } from "models/interface";

export type APIHttpProxyEvent = APIGatewayProxyEventV2WithRequestContext<
  APIGatewayEventRequestContextV2WithAuthorizer<
    APIGatewayEventRequestContextLambdaAuthorizer<any>
  >
>;

export type HandlerType = (
  DC: IDependencyContainer,
  event: APIHttpProxyEvent,
  context: Context
) => Promise<APIGatewayProxyResult>;
