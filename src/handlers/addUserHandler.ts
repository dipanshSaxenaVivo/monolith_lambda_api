
import * as Prisma from '@prisma/client';
import { APIGatewayProxyResult, Context } from 'aws-lambda';
import { IDependencyContainer } from 'models/interface'
import { APIHttpProxyEvent } from 'models/types';
import { hasRequiredFields } from 'utility';

/**
 * Handles API requests to add a new user.
 *
 * Expects a POST request with JSON body containing 'email' and 'name' fields.
 *
 * @param {IDependencyContainer} DC The dependency container providing access to the database client.
 * @param {APIHttpProxyEvent} event The API Gateway HTTP proxy event object containing the request data.
 * @param {Context} context The AWS Lambda context object.
 * @returns {Promise<APIGatewayProxyResult>} A Promise resolving to an API Gateway Proxy Result object.
 */
export const addUserHandler = async (DC: IDependencyContainer, event: APIHttpProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
  let body:Omit<Prisma.users,'password'|'id'> = event.body && JSON.parse(event.body)
  if (!body || !hasRequiredFields(body, "email", "name")) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "bad request" }),
    };
  }
  // if (!event.body) {
  //   return {
  //     statusCode: 400,
  //     body: JSON.stringify({ message: 'user data not provided' }),
  //   }
  // } else if(typeof event.body == 'object'){
  //   if(!('email' in event.body) || !('name' in event.body)){
  //     return {
  //       statusCode: 400,
  //       body: JSON.stringify({ message: 'bad request' }),
  //     }
  //   }
  // }
  try {
    const result = await DC.db_client.users.create({
      data: {...body},
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `new user added`, user: result }),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: `something went wrong`, error: error }),
    }
  }
};