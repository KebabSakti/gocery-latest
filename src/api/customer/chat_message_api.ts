import { DbService } from "../../common/helper/db_service";
import { ChatMessageModel } from "../../model/chat_message_model";

class ChatMessageApi {
  private db = DbService.instance();

  async index(chatRoomId: string): Promise<ChatMessageModel[]> {
    const chatMessages = await this.db<ChatMessageModel>("chat_messages").where(
      "chatRoomId",
      chatRoomId
    );

    return chatMessages;
  }

  async store(chatMessageModel: ChatMessageModel): Promise<void> {
    await this.db<ChatMessageModel>("chat_messages").insert(chatMessageModel);
  }

  async update(chatMessageModel: ChatMessageModel): Promise<void> {
    await this.db<ChatMessageModel>("chat_messages")
      .where("id", chatMessageModel.id!)
      .update(chatMessageModel);
  }
}

export { ChatMessageApi };
