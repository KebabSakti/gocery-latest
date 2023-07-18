import express, { Request, Response } from "express";
import { ErrorHandler } from "../../../common/helper/failure";
import { CustomerBannerController } from "../../../controller/customer/customer_banner_controller";
import { BannerModel } from "../../../model/banner_model";

const router = express.Router();
const customerBannerController = new CustomerBannerController();

router.get("/", async (req: Request, res: Response) => {
  try {
    const banners = await customerBannerController.index();

    const filteredFields: BannerModel[] = banners.map((e) => {
      return {
        id: e.id,
        image: e.image,
      };
    });

    res.json(filteredFields);
  } catch (error: any) {
    new ErrorHandler(res, error);
  }
});

export default router;
