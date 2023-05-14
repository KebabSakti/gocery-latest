import admin from "firebase-admin";
import serviceAccount from "../config/ayo-belanja-7bc1e-firebase-adminsdk-pxpmr-cacdd5bcd3.json";

class FirebaseAdminService {
  static init() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as any),
    });
  }
}

export { FirebaseAdminService };
