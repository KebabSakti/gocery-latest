import express, { Request, Response } from "express";
import { ErrorHandler } from "../../../common/helper/failure";
import { CustomerProductController } from "../../../controller/customer/customer_product_controller";
import { ProductModel } from "../../../model/product_model";

const router = express.Router();
const customerProductController = new CustomerProductController();

router.get("/", async (req: Request, res: Response) => {
  try {
    const { filter, sort, paginate } = req.query;

    const option = new Map<string, string | undefined>();
    option.set("filter", filter as string | undefined);
    option.set("sort", sort as string | undefined);
    option.set("paginate", paginate as string | undefined);

    console.log(option);

    const products = await customerProductController.index(option);

    const filteredFields: ProductModel[] = products.map((e) => {
      return {
        id: e.id,
        name: e.name,
        description: e.description,
        image: e.image,
        point: e.point,
        price: e.price,
        unit: e.unit,
        stok: e.stok,
        min: e.min,
        max: e.max,
        sold: e.sold,
        view: e.view,
        like: e.like,
      };
    });

    res.json(filteredFields);
  } catch (error: any) {
    new ErrorHandler(res, error);
  }
});

export default router;
