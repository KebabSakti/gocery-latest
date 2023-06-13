import { DbService } from "../common/helper/db_service";
import { Utility } from "../common/helper/utility";
import { CartModel } from "../model/cart_model";

class CartApi {
  private db = DbService.instance();

  async index(customerId: string): Promise<CartModel[]> {
    const cart = await this.db<CartModel>("carts")
      .join("products", "carts.productId", "=", "products.id")
      .where("carts.customerId", customerId)
      .select(
        "carts.*",
        "products.categoryId",
        "products.name",
        "products.description",
        "products.image",
        "products.point",
        "products.price",
        "products.unit",
        "products.stok",
        "products.max",
        "products.min",
        "products.sold",
        "products.view",
        "products.like"
      );

    return cart;
  }

  async upsert(cartModel: CartModel): Promise<void> {
    const now = Utility.nowSqlTimestamp();

    await this.db<CartModel>("carts")
      .insert({
        ...cartModel,
        created: now,
        updated: now,
      })
      .onConflict("id")
      .merge({
        ...cartModel,
        updated: now,
      });
  }

  async delete(cartId: string): Promise<void> {
    await this.db<CartModel>("carts").where("id", cartId).del();
  }
}

export { CartApi };
