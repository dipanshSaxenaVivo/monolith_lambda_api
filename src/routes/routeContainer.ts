import { addUserHandler, deleteUserHandler, updateUserHandler, decryptHandler, encryptHandler  } from "handlers";
import { RouteEnums } from "models/enums";

/**
 * @module route_container
 * @description
 * Provides a centralized and immutable mapping 
 * between API routes and their corresponding handler functions.
 * This structure ensures clear, maintainable, and efficient routing within the application.
 * Each handler function is associated with a specific route defined in `routeEnums`,
 * facilitating the handling of all api operations.
 */
const route_container = Object.freeze({
  [RouteEnums["/test/user/add"]]: addUserHandler,
  [RouteEnums["/test/user/delete"]]: deleteUserHandler,
  [RouteEnums["/test/user/update"]]: updateUserHandler,
  [RouteEnums["/test/decrypt"]]: decryptHandler,
  [RouteEnums["/test/encrypt"]]: encryptHandler,
})

export default route_container