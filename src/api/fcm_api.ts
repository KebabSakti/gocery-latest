import admin from "firebase-admin";
import { FcmModel } from "../model/fcm_model";

class FcmApi {
  async send(fcmModel: FcmModel): Promise<void> {
    const payload = {
      token: fcmModel.token,
      notification: {
        title: fcmModel.title,
        body: fcmModel.body,
      },
    };

    if (fcmModel.data) {
      payload["data"] = fcmModel.data;
    }

    await admin.messaging().send(payload);
  }
}

export { FcmApi };
