import express, { Request, Response } from "express";
import { ErrorHandler } from "../../../common/helper/failure";
import { CustomerCategoryController } from "../../../controller/customer/customer_category_controller";
import { CategoryModel } from "../../../model/category_model";

const router = express.Router();
const categoryController = new CustomerCategoryController();

router.get("/", async (req: Request, res: Response) => {
  try {
    const categories = await categoryController.index();

    const filteredFields: CategoryModel[] = categories.map((e) => {
      return {
        id: e.id,
        name: e.name,
        image: e.image,
        description: e.description,
      };
    });

    res.json(filteredFields);
  } catch (error: any) {
    new ErrorHandler(res, error);
  }
});

export default router;
