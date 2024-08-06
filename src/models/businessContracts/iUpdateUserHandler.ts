
export interface IUpdateUserHandlerResponse {
  id: string;
  email?: string;
  phoneNumber?: string | null;
  role?: number;
  name?: string
}

export interface IUpdateUserHandlerRequest {
  id: string;
  email?: string;
  phoneNumber?: string | null;
  role?: number;
  name?: string
}
