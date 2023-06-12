import { ChatApi } from "../../api/customer/chat_api";
import { FcmApi } from "../../api/fcm_api";
import { ChatModel } from "../../model/chat_model";

class ChatController {
  private chatApi = new ChatApi();
  private fcmApi = new FcmApi();

  async index(sessionId: string): Promise<ChatModel[]> {
    const chats = await this.chatApi.index(sessionId);

    return chats;
  }

  async store(chatModel: ChatModel): Promise<void> {
    await this.chatApi.store(chatModel);
  }

  async update(chatModel: ChatModel): Promise<void> {
    await this.chatApi.update(chatModel);
  }
}

export { ChatController };
