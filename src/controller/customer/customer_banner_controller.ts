import { CustomerBannerApi } from "../../api/customer/customer_banner_api";
import { BannerModel } from "../../model/banner_model";

class CustomerBannerController {
  private customerBannerApi = new CustomerBannerApi();

  async index(): Promise<BannerModel[]> {
    const banners = await this.customerBannerApi.index();

    return banners;
  }
}

export { CustomerBannerController };
