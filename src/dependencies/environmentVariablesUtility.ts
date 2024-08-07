import {
  SSMClient,
  GetParametersCommandInput,
  GetParametersCommand,
  Parameter,
} from "@aws-sdk/client-ssm";
import { IDependencyContainer } from "models/interface";

const client = new SSMClient();

/**
 * Parses an array of SSM parameters into an object.
 * @param {Parameter[]} parameters - The parameters to parse.
 * @returns {object} The parsed parameters as a key-value object.
 */
let parseParameters = (parameters: Parameter[]): {
  [k in string]: any;
} =>
  parameters.reduce(
    (
      acc: {},
      curr
    ) => ({
        ...acc,
        ...JSON.parse(curr.Value ?? "{}"),
      }),
    {}
  );

/**
 * Retrieves and parses all environment variables from SSM.
 * @returns {Promise<object>} The parsed environment variables.
 */
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

/**
 * Applies environment variables to the dependency container.
 * @param {IDependencyContainer} DC - The dependency container.
 * @returns {Promise<IDependencyContainer>} The updated dependency container with environment variables.
 */
export const applyEnvironmentVariables = async (
  DC: IDependencyContainer
): Promise<IDependencyContainer> => {
  let variables = await getAllVariables() ?? {}
  return {
    ...DC,
    environmentVariables: variables,
  };
};
