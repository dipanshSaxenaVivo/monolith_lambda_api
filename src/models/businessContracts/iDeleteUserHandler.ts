// type of an empty object
export type IDeleteUserHandlerResponse = {
  [K in any] : never
}

export interface IDeleteUserHandlerRequest {
  id:string
}