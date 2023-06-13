import { JwtModel } from "./jwt_model";

interface AuthModel {
  token?: string;
  jwtModel?: JwtModel;
}

export { AuthModel };
