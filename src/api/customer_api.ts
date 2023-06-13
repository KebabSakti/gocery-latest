import { DbService } from "../common/helper/db_service";
import { Utility } from "../common/helper/utility";
import { CustomerModel } from "../model/customer_model";

class CustomerApi {
  private db = DbService.instance();

  async show(customerId: string): Promise<CustomerModel | undefined> {
    let results: CustomerModel | undefined;

    const query = await this.db<CustomerModel>("customers")
      .select("id", "email", "name", "phone", "image", "point", "fcm", "point")
      .where("id", customerId)
      .where("active", true)
      .first();

    if (query) {
      results = query as CustomerModel;
    }

    return results;
  }

  async upsert(customer: CustomerModel): Promise<void> {
    const now = Utility.nowSqlTimestamp();

    await this.db<CustomerModel>("customers")
      .insert({
        ...customer,
        created: now,
        updated: now,
      })
      .onConflict()
      .merge({
        ...customer,
        updated: now,
      });
  }
}

export { CustomerApi };
