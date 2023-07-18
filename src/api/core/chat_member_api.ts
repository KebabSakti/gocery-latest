import { DbService } from "../../common/helper/db_service";
import { ChatMemberModel } from "../../model/chat_member_model";

class ChatMemberApi {
  private db = DbService.instance();

  async index(roomId: string): Promise<ChatMemberModel[]> {
    const chatMember = await this.db<ChatMemberModel>("chat_members").where(
      "roomId",
      roomId
    );

    return chatMember;
  }

  async show(chatMemberId: string): Promise<ChatMemberModel | undefined> {
    const chatMember = await this.db<ChatMemberModel>("chat_members")
      .where("id", chatMemberId)
      .first();

    return chatMember;
  }

  async store(chatMemberModel: ChatMemberModel): Promise<void> {
    await this.db<ChatMemberModel>("chat_members").insert(chatMemberModel);
  }
}

export { ChatMemberApi };
