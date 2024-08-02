import {
  addUserHandler,
  deleteUserHandler,
  updateUserHandler,
  decryptHandler,
  encryptHandler,
} from "handlers";
import { RouteEnums } from "models/enums";
import { HandlerType } from "models/types";

/**
 * @module ROUTE_CONTAINER
 * @description
 * Provides a centralized and immutable mapping
 * between API routes and their corresponding handler functions.
 * This structure ensures clear, maintainable, and efficient routing within the application.
 * Each handler function is associated with a specific route defined in `routeEnums`,
 * facilitating the handling of all api operations.
 */
// const ROUTE_CONTAINER = Object.freeze({
//   "/test/user/add": addUserHandler,
//   "/test/user/delete": deleteUserHandler,
//   "/test/user/update": updateUserHandler,
//   "/test/decrypt": decryptHandler,
//   "/test/encrypt": encryptHandler,
// });
// const ROUTE_CONTAINER = Object.freeze({
//   [RouteEnums["/test/user/add"]]: addUserHandler,
//   [RouteEnums["/test/user/delete"]]: deleteUserHandler,
//   [RouteEnums["/test/user/update"]]: updateUserHandler,
//   [RouteEnums["/test/decrypt"]]: decryptHandler,
//   [RouteEnums["/test/encrypt"]]: encryptHandler,
// });

const ROUTE_CONTAINER: Record<string, HandlerType<any>> = {
  "/test/user/add": addUserHandler,
  "/test/user/delete": deleteUserHandler,
  "/test/user/update": updateUserHandler,
  "/test/decrypt": decryptHandler,
  "/test/encrypt": encryptHandler
}

export default ROUTE_CONTAINER;
