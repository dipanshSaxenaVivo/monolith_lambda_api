import {
  SSMClient,
  GetParametersCommandInput,
  GetParametersCommand,
  Parameter,
} from "@aws-sdk/client-ssm";
import { IDependencyContainer } from "models/interface";

const client = new SSMClient();

let parseParameters = (parameters: Parameter[]) =>
  parameters.reduce(
    (
      acc: {},
      curr
    ): {
        [k in any]: string;
      } => ({
        ...acc,
        ...JSON.parse(curr.Value ?? "{}"),
      }),
    {}
  );

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
    return parseParameters(data.Parameters ?? []);
  } catch (error) {
    console.log(error, "EnvironmentVariablesUtility");
  }
};

export const applyEnvironmentVariables = async (
  DC: IDependencyContainer
): Promise<IDependencyContainer> => {
  let variables = await getAllVariables() ?? {}
  return {
    ...DC,
    environmentVariables: variables,
  };
};
