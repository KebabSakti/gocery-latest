import { DbService } from "../common/helper/db_service";
import { ChatRoomModel } from "../model/chat_room_model";

class ChatRoomApi {
  private db = DbService.instance();

  async index(userId: string): Promise<ChatRoomModel[]> {
    const chatRooms = await this.db<ChatRoomModel>("chat_rooms")
      .select("chat_rooms.*")
      .join("chat_members", "chat_members.roomId", "=", "chat_rooms.id")
      .where("chat_members.memberId", userId);

    return chatRooms;
  }

  async store(chatRoomModel: ChatRoomModel): Promise<void> {
    await this.db<ChatRoomModel>("chat_rooms").insert(chatRoomModel);
  }

  async update(chatRoomModel: ChatRoomModel): Promise<void> {
    await this.db<ChatRoomModel>("chat_rooms")
      .where("id", chatRoomModel.id)
      .update(chatRoomModel);
  }
}

export { ChatRoomApi };
