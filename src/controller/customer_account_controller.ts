import { CustomerApi } from "../api/customer_api";
import { ResourceNotFound } from "../common/helper/failure";
import { CustomerModel } from "../model/customer_model";

class CustomerAccountController {
  private customerApi = new CustomerApi();

  async show(customerId: string): Promise<CustomerModel | undefined> {
    const customer = await this.customerApi.show(customerId);

    if (customer == undefined) {
      throw new ResourceNotFound();
    }

    return customer;
  }

  async upsert(customer: CustomerModel): Promise<void> {
    await this.customerApi.upsert(customer);
  }
}

export { CustomerAccountController };
