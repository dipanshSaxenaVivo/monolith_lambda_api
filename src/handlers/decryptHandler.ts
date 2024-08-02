import { APIGatewayProxyResult, Context } from "aws-lambda";
import { IDecryptHandlerResponse } from "models/apiResponses";
import { ResponseCodeEnum } from "models/enums";
import { IDependencyContainer } from "models/interface";
import { APIHttpProxyEvent, APIResponse } from "models/types";
import { createStandardError } from "utility";

/**
 * Handles decryption requests using the ICryptography service in IDependencyContainer.
 *
 * Validates the request body and returns appropriate error responses.
 * Optionally logs the decryption result.
 *
 * @param {IDependencyContainer} DC - Dependency container with ICryptography and ILogger access.
 * @param {APIHttpProxyEvent} event - HTTP proxy event containing the encrypted data.
 * @param {Context} context - AWS Lambda context.
 * @returns {Promise<APIGatewayProxyResult>} - Response object with decrypted data or an error message.
 */
export const decryptHandler = async (
  DC: IDependencyContainer,
  event: APIHttpProxyEvent,
  context: Context
): Promise<APIResponse<IDecryptHandlerResponse>> => {
  let body = event.body;
  if (!body) {
    return {
      statusCode: 400,
      body: createStandardError(ResponseCodeEnum.INVALID_BODY),
    };
  }
  try {
    let result = await DC.cryptography.decrypt(body);
    DC.logger.log(result, "decrypt request handler");

    return {
      statusCode: 200,
      body: { message: `decrypted successfully`, decrypted: result },
    };
  } catch (error) {
    DC.logger.error(error);
    return {
      statusCode: 500,
      body: createStandardError(ResponseCodeEnum.INTERNAL_SERVER_ERROR),
    };
  }
};
