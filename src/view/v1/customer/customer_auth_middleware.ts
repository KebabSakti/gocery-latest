import { NextFunction, Request, Response } from "express";
import { ErrorHandler, Unauthorized } from "../../../common/helper/failure";
import { AuthController } from "../../../controller/auth_controller";

const authController = new AuthController();

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const bearerHeader: string | undefined = req.get("authorization");

    if (bearerHeader == undefined) {
      throw new Unauthorized();
    }

    const token = bearerHeader.split(" ")[1];
    const customer = await authController.verify(token);
    req.app.locals.user = customer;

    next();
  } catch (error: any) {
    new ErrorHandler(res, error);
  }
}

export default authMiddleware;
