import { handlerType } from "models/types";
import { createStandardError } from "utility";
import { AnySchema } from "yup";

/**
 * @module validation_middleware
 * @description
 * Middleware for validating request body using a provided Yup schema.
 * This middleware parses and validates the event body, then proceeds
 * to the next handler if validation succeeds. If validation fails, it
 * returns a 400 status code with a standard error message.
 * 
 * @param {AnySchema} schema - The Yup schema to validate the request body against.
 * @returns {Function} A middleware function that takes a handler and returns a new handler
 *                     with validation logic.
 * 
 * @example
 * // Usage with a Yup schema and a route handler
 * import * as yup from 'yup';
 * import { validation_middleware } from './middleware/validationMiddleware';
 * import { someRouteHandler } from './handlers';
 * 
 * const schema = yup.object().shape({
 *   name: yup.string().required(),
 *   age: yup.number().required(),
 * });
 * 
 * const validatedHandler = validation_middleware(schema)(someRouteHandler);
 */
export const validation_middleware = (schema: AnySchema) => {
  return (handler: handlerType) => {
    return async (injector: any, event: any, context: any) => {
      try {
        // Parse and validate the request body
        let validationResult = await schema.validate(
          JSON.parse(event.body || "{}"),
          { abortEarly: true }
        );
        
        // Update event body with the validated result
        event.body = validationResult;
        console.log(validationResult, "validationResult");
        
        // Proceed to the next handler
        return await handler(injector, event, context);
      } catch (error) {
        // Log the validation error
        injector.logger.error(error);
        
        // Return a 400 response with a standard error message
        return {
          statusCode: 400,
          body: JSON.stringify(
            createStandardError(parseInt((error as any).message))
          ),
        };
      }
    };
  };
};

