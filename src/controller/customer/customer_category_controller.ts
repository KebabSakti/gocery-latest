import { CustomerCategoryApi } from "../../api/customer/customer_category_api";
import { CategoryModel } from "../../model/category_model";

class CustomerCategoryController {
  private categoryApi = new CustomerCategoryApi();

  async index(): Promise<CategoryModel[]> {
    const categories = await this.categoryApi.index();

    return categories;
  }
}

export { CustomerCategoryController };
