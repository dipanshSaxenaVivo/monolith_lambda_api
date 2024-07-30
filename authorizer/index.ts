import { APIGatewayProxyEventV2WithIAMAuthorizer, Context } from "aws-lambda";

export const handler = (
  event: APIGatewayProxyEventV2WithIAMAuthorizer,
  context: Context
) => {
  try {
    return {
      isAuthorized: true,
      context: {
        me: "new",
      },
    };
  } catch (error) {}
};
