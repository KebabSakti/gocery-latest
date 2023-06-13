import express, { Request, Response } from "express";
import { ErrorHandler } from "../../../common/helper/failure";
import { CartController } from "../../../controller/cart_controller";
import { CartModel } from "../../../model/cart_model";

const router = express.Router();
const cartController = new CartController();

router.get("/", async (req: Request, res: Response) => {
  try {
    const customerId = req.app.locals.user.id;
    const cart = await cartController.index(customerId);

    res.json(cart);
  } catch (error: any) {
    new ErrorHandler(res, error);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const customerId = req.app.locals.user.id;
    const { id, productId, qty } = req.body;

    const cartModel: CartModel = {
      id: id,
      customerId: customerId,
      productId: productId,
      qty: qty,
    };

    await cartController.upsert(cartModel);

    res.end();
  } catch (error: any) {
    new ErrorHandler(res, error);
  }
});

router.delete("/", async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    await cartController.delete(id);

    res.end();
  } catch (error: any) {
    new ErrorHandler(res, error);
  }
});

export default router;
