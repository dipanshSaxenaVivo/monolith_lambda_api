
import * as Prisma from '@prisma/client';
import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { IDependencyContainer } from 'models/interface'
import { APIHttpProxyEvent } from 'models/types';
import { hasRequiredFields } from 'utility';

/**
 * Handles API requests to update a user. 
 * Expects a POST request containing a JSON body with the 'id' field, and optional email and name fields.
 *
 * @param {IDependencyContainer} DC The dependency container providing access to the database client.
 * @param {APIHttpProxyEvent} event The API Gateway HTTP proxy event object containing the request data.
 * @param {Context} context The AWS Lambda context object.
 * @returns {Promise<APIGatewayProxyResult>} A Promise resolving to an API Gateway Proxy Result object.
 */
export const updateUserHandler = async (DC: IDependencyContainer, event: APIHttpProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
  let body:Omit<Prisma.users, 'password'>= event.body && JSON.parse(event.body)
  if (!body || !hasRequiredFields(body, 'id')) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'bad request' }),
    }
  }
  console.log(body,'body')
  try {
    const result = await DC.db_client.users.update({
      where:{
        id:body.id
      },
      data: {...(()=>{delete (body as any).id; return body})()},
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `updated user successfully`, user: result }),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: `something went wrong`, error: error }),
    }
  }
};