import { BrcyptApi } from "../../api/bcrypt_api";
import { CourierApi } from "../../api/courier/courier_api";
import { JwtAuthApi } from "../../api/jwt_auth_api";
import {
  BadRequest,
  ResourceNotFound,
  Unauthorized,
} from "../../common/helper/failure";
import { CourierModel } from "../../model/courier_model";

class CourierAuthController {
  private courierApi = new CourierApi();
  private jwtApi = new JwtAuthApi();
  private bcryptApi = new BrcyptApi();

  async authenticate(email: string, password: string): Promise<string> {
    const courier = await this.courierApi.showByEmail(email);

    if (courier == null) {
      throw new ResourceNotFound("Email belum terdaftar");
    }

    const valid = await this.bcryptApi.compare(password, courier.password!);

    if (!valid) {
      throw new BadRequest("Password anda salah");
    }

    const token = this.jwtApi.sign({ id: courier.id, level: "courier" });

    return token;
  }

  async verify(token: string): Promise<CourierModel> {
    const jwtModel = this.jwtApi.verify(token);
    const courier = await this.courierApi.show(jwtModel.id!);

    if (courier == undefined) {
      throw new Unauthorized();
    }

    return courier;
  }
}

export { CourierAuthController };
