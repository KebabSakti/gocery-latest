import { CartApi } from "../../api/customer/cart_api";
import { ProductApi } from "../../api/customer/product_api";
import { CartModel } from "../../model/cart_model";

class CartController {
  private cartApi = new CartApi();
  private productApi = new ProductApi();

  async index(customerId: string): Promise<CartModel[]> {
    const cart = await this.cartApi.index(customerId);

    return cart;
  }

  async upsert(cartModel: CartModel): Promise<void> {
    const product = await this.productApi.show(cartModel.productId!);

    if (product != undefined) {
      const cartItemTotal = product.price! * cartModel.qty!;
      const payload = { ...cartModel, total: cartItemTotal };

      await this.cartApi.upsert(payload);
    }
  }

  async delete(cartId: string): Promise<void> {
    await this.cartApi.delete(cartId);
  }
}

export { CartController };
