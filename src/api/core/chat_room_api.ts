import { DbService } from "../../common/helper/db_service";
import { ChatRoomModel } from "../../model/chat_room_model";
import { OptionModel } from "../../model/option_model";

class ChatRoomApi {
  private db = DbService.instance();

  async index(userId: string, option?: OptionModel): Promise<ChatRoomModel[]> {
    const query = this.db<ChatRoomModel>("chat_rooms")
      .select("chat_rooms.*")
      .join("chat_members", "chat_members.roomId", "=", "chat_rooms.id")
      .where("chat_members.memberId", userId);

    if (option) {
      if (option.paginate) {
        query.offset(option.paginate.current).limit(option.paginate.limit);
      }
    }

    const chatRooms = await query;

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
