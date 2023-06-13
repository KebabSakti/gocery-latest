import admin from "firebase-admin";
import { CustomerModel } from "../model/customer_model";

class FirebaseAuthApi {
  async verify(token: string): Promise<CustomerModel> {
    const decodedIdToken = await admin.auth().verifyIdToken(token);
    const firebaseUser = await admin.auth().getUser(decodedIdToken.uid);

    const customer: CustomerModel = {
      id: firebaseUser.uid,
      email: firebaseUser.email,
      image: firebaseUser.photoURL,
      name: firebaseUser.displayName,
      phone: firebaseUser.phoneNumber,
    };

    return customer;
  }
}

export { FirebaseAuthApi };
