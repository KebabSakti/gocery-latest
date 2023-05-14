import express, { Request, Response } from "express";
import { ErrorHandler } from "../../../common/helper/failure";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    res.end();
  } catch (error: any) {
    new ErrorHandler(res, error);
  }
});

export default router;
