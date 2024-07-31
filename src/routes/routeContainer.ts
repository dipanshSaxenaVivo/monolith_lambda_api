import { add_user_handler, delete_user_handler, update_user_handler, decrypt_handler, encrypt_handler  } from "handlers";
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
  [RouteEnums["/test/user/add"]]: add_user_handler,
  [RouteEnums["/test/user/delete"]]: delete_user_handler,
  [RouteEnums["/test/user/update"]]: update_user_handler,
  [RouteEnums["/test/decrypt"]]: decrypt_handler,
  [RouteEnums["/test/encrypt"]]: encrypt_handler,
})

export default route_container