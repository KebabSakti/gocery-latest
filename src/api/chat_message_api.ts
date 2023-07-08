import { DbService } from "../common/helper/db_service";
import { ChatMessageModel } from "../model/chat_message_model";

class ChatMessageApi {
  private db = DbService.instance();

  async index(roomId: string): Promise<ChatMessageModel[]> {
    const chatMessages = await this.db<ChatMessageModel>("chat_messages")
      .select(
        "chat_messages.*",
        "chat_messages.id as chatMessageId",
        "chat_members.*",
        "chat_members.id as chatMemberId"
      )
      .join(
        "chat_members",
        "chat_messages.userId",
        "=",
        "chat_members.memberId"
      )
      .where("chat_members.roomId", roomId);

    return chatMessages;
  }

  async store(chatMessageModel: ChatMessageModel): Promise<void> {
    await this.db<ChatMessageModel>("chat_messages").insert(chatMessageModel);
  }

  async update(chatMessageModel: ChatMessageModel): Promise<void> {
    await this.db<ChatMessageModel>("chat_messages")
      .where("id", chatMessageModel.id)
      .update(chatMessageModel);
  }
}

export { ChatMessageApi };
