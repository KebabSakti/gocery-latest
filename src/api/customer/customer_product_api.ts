import { DbService } from "../../common/helper/db_service";
import { ProductModel } from "../../model/product_model";

class CustomerProductApi {
  private db = DbService.instance();

  async index(
    option?: Map<string, string | undefined>
  ): Promise<ProductModel[]> {
    const query = this.db<ProductModel>("products").where("active", 1);

    if (option) {
      if (option.get("paginate")) {
        const [current, limit] = option.get("paginate")!.split(",");
        query.offset(Number(current)).limit(Number(limit));
      }

      if (option.get("filter")) {
        const [field, value] = option.get("filter")!.split(",");

        if (field == "categoryId") {
          query.where("categoryId", value);
        }

        if (field == "name") {
          query.whereILike("name", `%${value}%`);
        }
      }

      if (option.get("sort")) {
        const [field, direction] = option.get("sort")!.split(",");

        if (field == "sold" && (direction == "desc" || direction == "asc")) {
          query.orderBy("sold", direction);
        }
      }
    }

    console.log(query.toQuery());

    const products = await query;

    return products;
  }

  async show(productId: string): Promise<ProductModel | undefined> {
    const product = await this.db<ProductModel>("products")
      .where("id", productId)
      .first();

    return product;
  }
}

export { CustomerProductApi };
