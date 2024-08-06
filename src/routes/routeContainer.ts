import {
  addUserHandler,
  deleteUserHandler,
  updateUserHandler,
} from "handlers";
import { HandlerType } from "models/types";
import { attachHandler } from "utility";

/**
 * A record of API routes mapped to their corresponding handlers.
 *
 * This container maps specific API routes to their respective handlers
 * using the `attachHandler` function. The `attachHandler` function wraps
 * the provided handler to ensure it processes API Gateway events correctly
 * within the AWS Lambda context.
 *
 * @type {Record<string, HandlerType>}
 * @constant
 */
const ROUTE_CONTAINER: Record<string, HandlerType> = {
  "/test/user/add": attachHandler(addUserHandler),
  "/test/user/delete": attachHandler(deleteUserHandler),
  "/test/user/update": attachHandler(updateUserHandler)
}

export default ROUTE_CONTAINER;
