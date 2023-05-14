import { DateTimeService } from "../common/helper/date_time_service";
import { DbService } from "../common/helper/db_service";
import { CustomerModel } from "../model/customer_model";

class CustomerApi {
  private db = new DbService();

  async show(customerId: string): Promise<CustomerModel | undefined> {
    let results: CustomerModel | undefined;

    const query = await this.db
      .instance()<CustomerModel>("customers")
      .select("email", "gender", "name", "phone", "picture", "point")
      .where("id", customerId)
      .where("active", true)
      .first();

    if (query) {
      results = query as CustomerModel;
    }

    return results;
  }

  async upsert(customer: CustomerModel): Promise<void> {
    const now = DateTimeService.nowSqlTimestamp();

    await this.db
      .instance()<CustomerModel>("customers")
      .insert({
        ...customer,
        created: now,
        updated: now,
      })
      .onConflict("id")
      .merge({
        ...customer,
        updated: now,
      });
  }
}
