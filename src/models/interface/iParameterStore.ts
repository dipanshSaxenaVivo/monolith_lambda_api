import { Parameter } from "@aws-sdk/client-ssm"

type storeKeys = {
  [k in any]:string
}

export interface IParameterStore {
  refreshVariables:() => Promise<Parameter[] | undefined>;
  variables:storeKeys
}