import express, { Request, Response } from "express";
import { ErrorHandler } from "../../../common/helper/failure";
import { CategoryController } from "../../../controller/customer/category_controller";

const router = express.Router();
const categoryController = new CategoryController();

router.get("/", async (req: Request, res: Response) => {
  try {
    const categories = await categoryController.index();

    res.json(categories);
  } catch (error: any) {
    new ErrorHandler(res, error);
  }
});

export default router;
