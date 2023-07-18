import { CustomerProductApi } from "../../api/customer/customer_product_api";
import { ProductModel } from "../../model/product_model";

class CustomerProductController {
  private customerProductApi = new CustomerProductApi();

  async index(
    option?: Map<string, string | undefined>
  ): Promise<ProductModel[]> {
    const products = await this.customerProductApi.index(option);

    return products;
  }

  async show(productId: string): Promise<ProductModel | undefined> {
    const product = await this.customerProductApi.show(productId);

    return product;
  }
}

export { CustomerProductController };
