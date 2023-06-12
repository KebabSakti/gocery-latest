import { CustomerApi } from "../../api/customer/customer_api";
import { FirebaseAuthApi } from "../../api/customer/firebase_auth_api";
import { JwtAuthApi } from "../../api/jwt_auth_api";
import { Unauthorized } from "../../common/helper/failure";
import { AuthModel } from "../../model/auth_model";
import { CustomerModel } from "../../model/customer_model";
import { JwtModel } from "../../model/jwt_model";

class CustomerAuthController {
  private firebaseAuthApi = new FirebaseAuthApi();
  private customerApi = new CustomerApi();
  private jwtAuthApi = new JwtAuthApi();

  async validate(token: string): Promise<AuthModel> {
    let validatedUser: CustomerModel;

    const firebaseUser = await this.firebaseAuthApi.verify(token);
    const user = await this.customerApi.show(firebaseUser.id!);

    if (user == undefined) {
      await this.customerApi.upsert(firebaseUser);
      validatedUser = firebaseUser;
    } else {
      validatedUser = user;
    }

    const jwtModel: JwtModel = {
      id: validatedUser!.id,
      level: "customer",
    };

    const jwtToken: string = this.jwtAuthApi.sign(jwtModel);

    const auth: AuthModel = {
      customer: validatedUser,
      token: jwtToken,
    };

    return auth;
  }

  async verify(token: string): Promise<CustomerModel> {
    const jwtModel = this.jwtAuthApi.verify(token);
    const customer = await this.customerApi.show(jwtModel.id!);

    if (customer == undefined) {
      throw new Unauthorized();
    }

    return customer;
  }
}

export { CustomerAuthController };
