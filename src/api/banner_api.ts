import { DbService } from "../common/helper/db_service";
import { BannerModel } from "../model/banner_model";

class BannerApi {
  private db = DbService.instance();

  async index(): Promise<BannerModel[]> {
    const banners = await this.db<BannerModel>("banners").where("active", 1);

    return banners;
  }
}

export { BannerApi };
