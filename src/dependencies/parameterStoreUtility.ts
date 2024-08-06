import {
  SSMClient,
  GetParametersCommandInput,
  GetParametersCommand,
} from "@aws-sdk/client-ssm";
import { IDependencyContainer } from "models/interface";

const client = new SSMClient();
let variables = {
  "23": "as",
};

export const getAllVariables = async () => {
  try {
    let paramsForCommand: GetParametersCommandInput = {
      Names: [
        "/dev/env/my-json-secure-parameter",
        "/dev/env/my-json-parameter",
      ],
      WithDecryption: true,
    };
    const getCommand = new GetParametersCommand(paramsForCommand);
    const data = await client.send(getCommand);
    console.log(data, "variables");
    // variables = data.Parameters
    return data.Parameters;
  } catch (error) {
    console.log(error, "parameterStoreUtility");
  }
};

await getAllVariables()

export const applyParameterStore = (
  DC: IDependencyContainer
): IDependencyContainer => {
  return { ...DC, store: {
    refreshVariables:getAllVariables,
    variables
  } };
};
