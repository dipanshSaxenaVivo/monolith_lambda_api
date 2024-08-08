import {
  addUserHandler,
  deleteUserHandler,
  updateUserHandler,
} from "businessHandlers";
import { LambdaHandlerType } from "models/types";
import { attachToHandler } from "mediators";

/**
 * A record of API routes mapped to their corresponding handlers.
 *
 * This container maps specific API routes to their respective handlers
 * using the `attachToHandler` function. The `attachToHandler` function wraps
 * the provided handler to ensure it processes API Gateway events correctly
 * within the AWS Lambda context.
 *
 * @type {Record<string, LambdaHandlerType>}
 * @constant
 */
const ROUTE_CONTAINER: Record<string, LambdaHandlerType> = {
  "/user/add": attachToHandler(addUserHandler),
  "/user/delete": attachToHandler(deleteUserHandler),
  "/user/update": attachToHandler(updateUserHandler)
}

export default ROUTE_CONTAINER;
