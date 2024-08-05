import {
  addUserHandler,
  deleteUserHandler,
  updateUserHandler,
} from "handlers";
import { HandlerType } from "models/types";
import { attachHandler } from "utility";

/**
 * @module ROUTE_CONTAINER
 * @description
 * Provides a centralized and immutable mapping
 * between API routes and their corresponding handler functions.
 * This structure ensures clear, maintainable, and efficient routing within the application.
 * Each handler function is associated with a specific route defined in `routeEnums`,
 * facilitating the handling of all api operations.
 */
const ROUTE_CONTAINER: Record<string, HandlerType> = {
  "/test/user/add": attachHandler(addUserHandler),
  "/test/user/delete": attachHandler(deleteUserHandler),
  "/test/user/update": attachHandler(updateUserHandler)
}

export default ROUTE_CONTAINER;
