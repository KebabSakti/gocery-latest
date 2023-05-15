import { CustomerApi } from "../../api/customer_api";
import { FirebaseAuth } from "../../api/firebase_auth";
import { CustomerModel } from "../../model/customer_model";

class CustomerAuthController {
  private firebaseAuth = new FirebaseAuth();
  private customerApi = new CustomerApi();

  async validate(token: string): Promise<CustomerModel> {
    let firebaseUser = await this.firebaseAuth.verify(token);
    const user = await this.customerApi.show(firebaseUser.id!);

    if (user == undefined) {
      await this.customerApi.upsert(firebaseUser);
    }

    return firebaseUser;
  }
}

export { CustomerAuthController };
