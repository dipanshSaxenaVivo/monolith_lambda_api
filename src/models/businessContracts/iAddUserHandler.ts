
export interface IAddUserHandlerResponse {
  id: string;
  email: string;
  phoneNumber: string | null;
  role: number;
  name: string
}

export interface IAddUserHandlerRequest {
  email: string;
  phoneNumber: string | null;
  role: number;
  name: string
}