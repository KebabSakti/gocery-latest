import { ChatMemberApi } from "../api/chat_member_api";
import { CourierApi } from "../api/courier_api";
import { CustomerApi } from "../api/customer_api";
import { ResourceNotFound } from "../common/helper/failure";
import { ChatMemberModel } from "../model/chat_member_model";
import { CourierModel } from "../model/courier_model";
import { CustomerModel } from "../model/customer_model";

class ChatMemberController {
  private chatMemberApi = new ChatMemberApi();
  private customerApi = new CustomerApi();
  private courierApi = new CourierApi();

  async index(roomId: string): Promise<ChatMemberModel[]> {
    const chatMembers = await this.chatMemberApi.index(roomId);

    return chatMembers;
  }

  async show(chatMemberId: string): Promise<ChatMemberModel | undefined> {
    const chatMember = await this.chatMemberApi.show(chatMemberId);

    return chatMember;
  }

  async store(chatMemberModel: ChatMemberModel): Promise<void> {
    let user: CustomerModel | CourierModel | undefined;

    if (chatMemberModel.memberType == "customer") {
      user = await this.customerApi.show(chatMemberModel.memberId!);
    }

    if (chatMemberModel.memberType == "courier") {
      user = await this.courierApi.show(chatMemberModel.memberId!);
    }

    if (user == undefined) {
      throw new ResourceNotFound("User tidak ditemukan");
    }

    await this.chatMemberApi.store({
      ...chatMemberModel,
      memberName: user.name,
      memberPhone: user.phone,
      memberImage: user.image,
      memberFcm: user.fcm,
    });
  }
}

export { ChatMemberController };
