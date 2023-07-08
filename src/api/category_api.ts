import { DbService } from "../common/helper/db_service";
import { CategoryModel } from "../model/category_model";

class CategoryApi {
  private db = DbService.instance();

  async index(): Promise<CategoryModel[]> {
    const categories = await this.db<CategoryModel>("categories");

    return categories;
  }
}

export { CategoryApi };
