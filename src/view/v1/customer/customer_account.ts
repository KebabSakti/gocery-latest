import express, { Request, Response } from "express";
import { ErrorHandler } from "../../../common/helper/failure";
import { CustomerAccountController } from "../../../controller/customer_account_controller";
import { CustomerModel } from "../../../model/customer_model";

const router = express.Router();
const accountController = new CustomerAccountController();

router.get("/", async (req: Request, res: Response) => {
  try {
    const customerId = req.app.locals.user.id;
    const customer = await accountController.show(customerId);

    const filteredCustomer: CustomerModel = {
      email: customer?.email,
      name: customer?.name,
      phone: customer?.phone,
      image: customer?.image,
      point: customer?.point,
    };

    res.json(filteredCustomer);
  } catch (error: any) {
    new ErrorHandler(res, error);
  }
});

router.put("/", async (req: Request, res: Response) => {
  try {
    const { name, email, phone, image, fcm } = req.body;
    const customerId = req.app.locals.user.id;

    const updatedAccount = {
      id: customerId,
      name: name,
      email: email,
      phone: phone,
      image: image,
      fcm: fcm,
    };

    await accountController.upsert(updatedAccount);

    res.end();
  } catch (error: any) {
    new ErrorHandler(res, error);
  }
});

export default router;
