import {
  APIGatewayEventRequestContextLambdaAuthorizer,
  APIGatewayEventRequestContextV2,
  APIGatewayEventRequestContextV2WithAuthorizer,
  APIGatewayProxyEventV2WithRequestContext,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { IDependencyContainer } from "models/interface";

export type APIHttpProxyEvent = APIGatewayProxyEventV2WithRequestContext<
  APIGatewayEventRequestContextV2WithAuthorizer<
    APIGatewayEventRequestContextLambdaAuthorizer<any>
  >
>;

export type handlerType = (
  DC: IDependencyContainer,
  event: APIHttpProxyEvent,
  context: Context
) => Promise<APIGatewayProxyResult>;

export type middlewareType = (...args: any[]) => handlerType;
