import { DbService } from "../../common/helper/db_service";
import { ChatModel } from "../../model/chat_model";

class ChatApi {
  private db = DbService.instance();

  async index(sessionId: string): Promise<ChatModel[]> {
    const chats = await this.db<ChatModel>("chats").where(
      "sessionId",
      sessionId
    );

    return chats;
  }

  async store(chatModel: ChatModel): Promise<void> {
    await this.db<ChatModel>("chats").insert(chatModel);
  }

  async update(chatModel: ChatModel): Promise<void> {
    await this.db<ChatModel>("chats")
      .where("id", chatModel.id)
      .update(chatModel);
  }
}

export { ChatApi };
