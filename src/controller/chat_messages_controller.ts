import { ChatMemberApi } from "../api/chat_member_api";
import { ChatMessageApi } from "../api/chat_message_api";
import { FcmApi } from "../api/fcm_api";
import { ChatMessageModel } from "../model/chat_message_model";

class ChatMessageController {
  private chatMessageApi = new ChatMessageApi();
  private chatMemberApi = new ChatMemberApi();
  private fcmApi = new FcmApi();

  async index(roomId: string): Promise<ChatMessageModel[]> {
    const chatMessages = await this.chatMessageApi.index(roomId);

    return chatMessages;
  }

  async store(chatMessageModel: ChatMessageModel): Promise<void> {
    await this.chatMessageApi.store({
      id: chatMessageModel.id,
      userId: chatMessageModel.userId,
      message: chatMessageModel.message,
      created: chatMessageModel.created,
      updated: chatMessageModel.updated,
    });

    const chatMembers = await this.chatMemberApi.index(
      chatMessageModel.roomId!
    );

    const tokens: string[] = [];

    chatMembers.forEach((e) => {
      if (e.memberId != chatMessageModel.userId) {
        tokens.push(e.memberFcm!);
      }
    });

    if (tokens.length > 0) {
      await this.fcmApi.send({
        tokens: tokens,
        title: chatMessageModel.memberName!,
        body: chatMessageModel.message!,
        data: { type: "message" },
      });
    }
  }

  async update(chatMessageModel: ChatMessageModel): Promise<void> {
    await this.chatMessageApi.update(chatMessageModel);
  }
}

export { ChatMessageController };
