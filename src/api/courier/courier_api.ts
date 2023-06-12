import { DbService } from "../../common/helper/db_service";
import { CourierModel } from "../../model/courier_model";

class CourierApi {
  private db = DbService.instance();

  async show(customerId: string): Promise<CourierModel | undefined> {
    let results: CourierModel | undefined;

    const query = await this.db<CourierModel>("couriers")
      .where("id", customerId)
      .where("active", true)
      .first();

    if (query) {
      results = query as CourierModel;
    }

    return results;
  }

  async upsert(courier: CourierModel): Promise<void> {
    await this.db<CourierModel>("couriers")
      .insert(courier)
      .onConflict()
      .merge();
  }

  async showByEmail(email: string): Promise<CourierModel | undefined> {
    let results: CourierModel | undefined;

    const query = await this.db<CourierModel>("couriers")
      .where("email", email)
      .where("active", true)
      .first();

    if (query) {
      results = query as CourierModel;
    }

    return results;
  }
}

export { CourierApi };
