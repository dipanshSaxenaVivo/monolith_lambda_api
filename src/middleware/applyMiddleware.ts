import { handlerType, middlewareType } from "models/types";

/**
 * Applies a series of middleware functions to an original handler function.
 * 
 * This utility function allows wrapping multiple middleware functions
 * around a single handler to add functionalities like logging, validation, etc.
 * 
 * @function apply_middleware
 * 
 * @param {function} handler - The original handler function to be wrapped.
 * @param {function[]} middlewares - An array of middleware functions to apply.
 * 
 * @returns {function} - The wrapped handler with all middlewares applied.
 * 
 * @example
 * // Middleware functions
 * const validateMiddleware = (handler) => {
 *   return async (injector, event, context) => {
 *     console.log('Before handler');
 *     const result = await handler(injector, event, context);
 *     console.log('After handler');
 *     return result;
 *   };
 * };
 * 
 * const authMiddleware = (handler) => {
 *   return async (injector, event, context) => {
 *     if (!event.headers.Authorization) {
 *       return { statusCode: 401, body: 'Unauthorized' };
 *     }
 *     return await handler(injector, event, context);
 *   };
 * };
 * 
 * // Original handler function
 * const originalHandler = async (injector, event, context) => {
 *   return { statusCode: 200, body: 'Success' };
 * };
 * 
 * // Apply middlewares
 * const wrappedHandler = apply_middleware(originalHandler, [validateMiddleware, authMiddleware]);
 * 
 * // Simulate invocation
 * wrappedHandler({}, { headers: { Authorization: undefined } }, {}).then(console.log);
 * 
 * // Output order:
 * // Before handler
 * // After handler
 * // { statusCode: 401, body: 'Unauthorized' }
 */
export const apply_middleware = (handler: handlerType, middlewares: middlewareType[]): handlerType => {
  return middlewares.reverse().reduce((wrapped, middleware) => middleware(wrapped), handler);
};
