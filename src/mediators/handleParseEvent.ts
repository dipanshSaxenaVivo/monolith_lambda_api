import { ILogger } from "models/interface";
import { APIHttpProxyEvent } from "models/types";

export const handleParseEvent = (event: APIHttpProxyEvent,logger:ILogger) => {
  try {
    if (!event.body) {
      logger.log("error in parsing")
      throw new Error("invalidBody");
    }
    // try catch and return response
    let parsedBody = JSON.parse(event.body);
    return parsedBody;
  } catch (error) {
    logger.log(error)
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: (error as any).message,
      }),
    };
  }
};
