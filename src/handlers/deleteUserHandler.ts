import * as Prisma from "@prisma/client";
import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { ResponseCodeEnum } from "models/enums";
import { IDependencyContainer } from "models/interface";
import { APIHttpProxyEvent, APIResponse } from "models/types";
import { idValidateSchema } from "schema";
import { IdValidateModel } from "schema/idValidateSchema";
import { createStandardError, hasRequiredFields } from "utility";

/**
 * Handles API requests to delete a user.
 * Expects a POST request containing a JSON body with the 'id' field.
 *
 * @param {IDependencyContainer} DC The dependency container providing access to the database client.
 * @param {APIHttpProxyEvent} event The API Gateway HTTP proxy event object containing the request data.
 * @param {Context} context The AWS Lambda context object.
 * @returns {Promise<APIGatewayProxyResult>} A Promise resolving to an API Gateway Proxy Result object.
 */
export const deleteUserHandler = async (
  DC: IDependencyContainer,
  event: APIHttpProxyEvent,
  context: Context
): Promise<APIResponse<{}>> => {
  let body = event.body as unknown as IdValidateModel;
  try {
    const result = await DC.db_client.users.delete({
      where: {
        id: body.id,
      },
    });

    return {
      statusCode: 200,
      body: {
        message: `deleted user successfully`,
      },
    };
  } catch (error) {
    DC.logger.error(error);
    return {
      statusCode: 500,
      body: createStandardError(ResponseCodeEnum.INTERNAL_SERVER_ERROR),
    };
  }
};
