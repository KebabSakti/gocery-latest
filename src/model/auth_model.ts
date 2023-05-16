import { CustomerModel } from "./customer_model";

interface AuthModel {
  token?: string;
  customer?: CustomerModel;
}

export { AuthModel };
