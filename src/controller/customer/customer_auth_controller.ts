import { CustomerApi } from "../../api/customer_api";
import { FirebaseAuth } from "../../api/firebase_auth";
import { JwtAuth } from "../../api/jwt_auth";
import { Unauthorized } from "../../common/helper/failure";
import { AuthModel } from "../../model/auth_model";
import { CustomerModel } from "../../model/customer_model";
import { JwtModel } from "../../model/jwt_model";

class CustomerAuthController {
  private firebaseAuth = new FirebaseAuth();
  private customerApi = new CustomerApi();
  private jwtAuth = new JwtAuth();

  async validate(token: string): Promise<AuthModel> {
    const firebaseUser = await this.firebaseAuth.verify(token);
    const user = await this.customerApi.show(firebaseUser.id!);

    if (user == undefined) {
      await this.customerApi.upsert(firebaseUser);
    }

    const jwtModel: JwtModel = {
      id: user!.id,
      level: "customer",
    };

    const jwtToken: string = this.jwtAuth.sign(jwtModel);

    const auth: AuthModel = {
      customer: user,
      token: jwtToken,
    };

    return auth;
  }

  async verify(token: string): Promise<CustomerModel> {
    const jwtModel = this.jwtAuth.verify(token);
    const customer = await this.customerApi.show(jwtModel.id!);

    if (customer == undefined) {
      throw new Unauthorized();
    }

    return customer;
  }
}

export { CustomerAuthController };
