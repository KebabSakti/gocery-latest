import jwt from "jsonwebtoken";
import { JwtModel } from "../../model/jwt_model";

class JwtAuthApi {
  sign(jwtModel: JwtModel): string {
    const token = jwt.sign(jwtModel, process.env.JWT_SECRET!, {
      expiresIn: "1 year",
    });

    return token;
  }

  verify(token: string): JwtModel {
    const jwtPayload: any = jwt.verify(token, process.env.JWT_SECRET!);

    const jwtModel: JwtModel = {
      id: jwtPayload.id,
      level: jwtPayload.level,
    };

    return jwtModel;
  }
}

export { JwtAuthApi };
