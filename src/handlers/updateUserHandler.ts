import * as Prisma from "@prisma/client";
import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { IUpdateUserHandlerResponse } from "models/apiResponses";
import { ResponseCodeEnum } from "models/enums";
import { IDependencyContainer } from "models/interface";
import { APIHttpProxyEvent, APIResponse } from "models/types";
import { updateUserSchema } from "schema";
import { UpdateUserModel } from "schema/updateUserSchema";
import { createStandardError, hasRequiredFields } from "utility";

/**
 * Handles API requests to update a user.
 * Expects a POST request containing a JSON body with the 'id' field, and optional email and name fields.
 *
 * @param {IDependencyContainer} DC The dependency container providing access to the database client.
 * @param {APIHttpProxyEvent} event The API Gateway HTTP proxy event object containing the request data.
 * @param {Context} context The AWS Lambda context object.
 * @returns {Promise<APIGatewayProxyResult>} A Promise resolving to an API Gateway Proxy Result object.
 */
export const updateUserHandler = async (
  DC: IDependencyContainer,
  event: APIHttpProxyEvent,
  context: Context
): Promise<APIResponse<IUpdateUserHandlerResponse>> => {
  let body = event.body as unknown as UpdateUserModel;
  try {
    let { id, ...restBody } = body;
    const result = await DC.db_client.users.update({
      where: {
        id: id,
      },
      data: restBody,
    });

    return {
      statusCode: 200,
      body: {
        message: `updated user successfully`,
        user: result,
      },
    };
  } catch (error) {
    DC.logger.error(error);
    return {
      statusCode: 500,
      body: 
        createStandardError(ResponseCodeEnum.INTERNAL_SERVER_ERROR)
      ,
    };
  }
};
