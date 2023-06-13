import { BrcyptApi } from "../api/bcrypt_api";
import { CourierApi } from "../api/courier/courier_api";
import { CustomerApi } from "../api/customer/customer_api";
import { FirebaseAuthApi } from "../api/customer/firebase_auth_api";
import { JwtAuthApi } from "../api/jwt_auth_api";
import {
  BadRequest,
  ResourceNotFound,
  Unauthorized,
} from "../common/helper/failure";
import { AuthModel } from "../model/auth_model";
import { CustomerModel } from "../model/customer_model";
import { JwtModel } from "../model/jwt_model";

class AuthController {
  private customerApi = new CustomerApi();
  private courierApi = new CourierApi();
  private firebaseAuthApi = new FirebaseAuthApi();
  private jwtAuthApi = new JwtAuthApi();
  private bcryptApi = new BrcyptApi();

  async validateCustomer(firebaseToken: string): Promise<AuthModel> {
    let validatedUser: CustomerModel;

    const firebaseUser = await this.firebaseAuthApi.verify(firebaseToken);
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

    const token: string = this.jwtAuthApi.sign(jwtModel);

    const auth: AuthModel = {
      jwtModel: jwtModel,
      token: token,
    };

    return auth;
  }

  async validateCourier(email: string, password: string): Promise<AuthModel> {
    const courier = await this.courierApi.showByEmail(email);

    if (courier == null) {
      throw new ResourceNotFound("Email belum terdaftar");
    }

    const valid = await this.bcryptApi.compare(password, courier.password!);

    if (!valid) {
      throw new BadRequest("Password anda salah");
    }

    const jwtModel: JwtModel = {
      id: courier!.id,
      level: "courier",
    };

    const token = this.jwtAuthApi.sign(jwtModel);

    const auth: AuthModel = {
      jwtModel: jwtModel,
      token: token,
    };

    return auth;
  }

  async verify(token: string): Promise<JwtModel> {
    const jwtPayload = this.jwtAuthApi.verify(token);

    if (jwtPayload.level == "customer") {
      const customer = await this.customerApi.show(jwtPayload.id!);

      if (customer) {
        const result = { id: customer.id, level: "customer" };

        return result;
      }
    }

    if (jwtPayload.level == "courier") {
      const courier = await this.courierApi.show(jwtPayload.id!);

      if (courier) {
        const result = { id: courier.id, level: "courier" };

        return result;
      }
    }

    throw new Unauthorized();
  }
}

export { AuthController };
