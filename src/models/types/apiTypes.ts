import {
  APIGatewayEventRequestContextLambdaAuthorizer,
  APIGatewayEventRequestContextV2WithAuthorizer,
  APIGatewayProxyEventV2WithRequestContext,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { IError } from "models/apiResponses";
import { IDependencyContainer } from "models/interface";

export type APIHttpProxyEvent = APIGatewayProxyEventV2WithRequestContext<
  APIGatewayEventRequestContextV2WithAuthorizer<
    APIGatewayEventRequestContextLambdaAuthorizer<any>
  >
>;

export type APIResponse<T> = Omit<APIGatewayProxyResult,'body'> & {
  body: T | IError;
};

export type HandlerType<T> = (
  DC: IDependencyContainer,
  event: APIHttpProxyEvent,
  context: Context
) => Promise<APIResponse<T>>;
