import { ChatMessageApi } from "../../api/customer/chat_message_api";
import { ChatParticipantApi } from "../../api/customer/chat_participant_api";
import { FcmApi } from "../../api/fcm_api";
import { ChatMessageModel } from "../../model/chat_message_model";

class ChatMessageController {
  private chatMessageApi = new ChatMessageApi();
  private chatParticipantApi = new ChatParticipantApi();
  private fcmApi = new FcmApi();

  async index(chatRoomId: string): Promise<ChatMessageModel[]> {
    const chatMessages = await this.chatMessageApi.index(chatRoomId);

    return chatMessages;
  }

  async store(chatMessageModel: ChatMessageModel): Promise<void> {
    const userType =
      chatMessageModel.userType == "courier" ? "customer" : "courier";

    const participant = await this.chatParticipantApi.show(
      chatMessageModel.chatRoomId!,
      userType
    );

    if (participant) {
      await this.fcmApi.send({
        token: participant.userToken!,
        title: chatMessageModel.userName!,
        body: chatMessageModel.message!,
        data: { type: "message" },
      });
    }

    await this.chatMessageApi.store(chatMessageModel);
  }

  async update(chatMessageModel: ChatMessageModel): Promise<void> {
    await this.chatMessageApi.update(chatMessageModel);
  }
}

export { ChatMessageController };
