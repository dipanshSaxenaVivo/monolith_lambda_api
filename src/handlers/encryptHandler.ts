import { APIGatewayProxyResult, Context } from "aws-lambda";
import { IEncryptHandlerResponse } from "models/apiResponses";
import { ResponseCodeEnum } from "models/enums";
import { IDependencyContainer } from "models/interface";
import { APIHttpProxyEvent, APIResponse } from "models/types";
import { createStandardError } from "utility";

/**
 * Handles encryption requests using the ICryptography service in IDependencyContainer.
 *
 * Validates the request body and returns appropriate error responses.
 * Optionally logs the encryption result.
 *
 * @param {IDependencyContainer} DC - Dependency container with ICryptography and ILogger access.
 * @param {APIHttpProxyEvent} event - HTTP proxy event containing the encrypted data and an optional key.
 * @param {Context} context - AWS Lambda context.
 * @returns {Promise<APIGatewayProxyResult>} - Response object with encrypted data or an error message.
 */
export const encryptHandler = async (
  DC: IDependencyContainer,
  event: APIHttpProxyEvent,
  context: Context
): Promise<APIResponse<IEncryptHandlerResponse>> => {
  let body: { key?: string; data: string } =
    event.body && JSON.parse(event.body);
  if (!body) {
    return {
      statusCode: 400,
      body: createStandardError(ResponseCodeEnum.INVALID_BODY),
    };
  }
  try {
    let result = await DC.cryptography.encrypt(body.data, body?.key);
    DC.logger.log(result, "encrypt request handler");

    return {
      statusCode: 200,
      body: { message: `encrypted successfully`, encrypted: result },
    };
  } catch (error) {
    DC.logger.error(error);
    return {
      statusCode: 500,
      body: createStandardError(ResponseCodeEnum.INTERNAL_SERVER_ERROR),
    };
  }
};
