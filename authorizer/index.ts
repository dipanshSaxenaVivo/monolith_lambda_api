import { APIGatewayProxyEventV2WithIAMAuthorizer, Context } from "aws-lambda";
import {route_permission_container} from 'routes'

export const handler = (
  event: APIGatewayProxyEventV2WithIAMAuthorizer,
  context: Context
) => {
  try {

    console.log(event,context,route_permission_container)

    return {
      isAuthorized: true,
      context: {
        me: "new",
      },
    };
  } catch (error) {}
};
