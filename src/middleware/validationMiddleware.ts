import { handlerType } from "models/types";
import { handlerErrorReturn } from "utility";
import { AnySchema } from "yup";

export const validationMiddleware = (schema: AnySchema) => {
  return (handler: handlerType) => {
    return async (injector: any, event: any, context: any) => {
      try {
        let validationResult = await schema.validate(
          JSON.parse(event.body || "{}"),
          { abortEarly: true }
        );
        event.body = validationResult;
        console.log(validationResult, "validationResult");
        return await handler(injector, event, context);
      } catch (error) {
        injector.logger.error(error);
        return {
          statusCode: 400,
          body: JSON.stringify(
            handlerErrorReturn(parseInt((error as any).message))
          ),
        };
      }
    };
  };
};
