import express, { Request, Response } from "express";
import Joi from "joi";
import { BadRequest, ErrorHandler } from "../../../common/helper/failure";
import { AuthController } from "../../../controller/auth_controller";

const router = express.Router();
const authController = new AuthController();

router.post("/", async (req: Request, res: Response) => {
  try {
    const schema = Joi.object({ token: Joi.string().required() }).unknown();
    const option = { ...req.body };

    const { error } = schema.validate(option);

    if (error) {
      throw new BadRequest("Auth token invalid");
    }

    const auth = await authController.validateCustomer(option.token);
    req.app.locals.user = auth.jwtModel;

    res.json({ token: auth.token });
  } catch (error: any) {
    new ErrorHandler(res, error);
  }
});

export default router;
