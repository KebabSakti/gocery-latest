import { DbService } from "../../common/helper/db_service";
import { ProductModel } from "../../model/product_model";

class ProductApi {
  private db = DbService.instance();

  async show(productId: string): Promise<ProductModel | undefined> {
    const product = await this.db<ProductModel>("products")
      .where("id", productId)
      .first();

    return product;
  }
}

export { ProductApi };
