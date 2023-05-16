import express, { Request, Response } from "express";
import Joi from "joi";
import { BadRequest, ErrorHandler } from "../../../common/helper/failure";
import { CustomerAuthController } from "../../../controller/customer/customer_auth_controller";

const router = express.Router();
const authController = new CustomerAuthController();

router.post("/", async (req: Request, res: Response) => {
  try {
    const schema = Joi.object({ token: Joi.string().required() }).unknown();
    const option = { ...req.body };

    const { error } = schema.validate(option);

    if (error) {
      throw new BadRequest("Auth token not found");
    }

    const auth = await authController.validate(option.token);
    req.app.locals.customer = auth.customer;

    res.json({ token: auth.token });
  } catch (error: any) {
    new ErrorHandler(res, error);
  }
});

export default router;
