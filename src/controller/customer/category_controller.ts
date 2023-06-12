import { CategoryApi } from "../../api/customer/category_api";
import { CategoryModel } from "../../model/category_model";

class CategoryController {
  private categoryApi = new CategoryApi();

  async index(): Promise<CategoryModel[]> {
    const categories = await this.categoryApi.index();

    return categories;
  }
}

export { CategoryController };
