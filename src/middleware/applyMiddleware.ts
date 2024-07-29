import { handlerType, middlewareType } from "models/types";

export const applyMiddleware = (handler: handlerType, middlewares: middlewareType[]) => {
  return middlewares.reverse().reduce((wrapped, middleware) => middleware(wrapped), handler);
};