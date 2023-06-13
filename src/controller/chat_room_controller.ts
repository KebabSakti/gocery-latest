import { ChatRoomApi } from "../api/chat_room_api";
import { ChatRoomModel } from "../model/chat_room_model";

class ChatRoomController {
  private chatRoomApi = new ChatRoomApi();

  async index(userId: string): Promise<ChatRoomModel[]> {
    const chatRooms = await this.chatRoomApi.index(userId);

    return chatRooms;
  }

  async store(chatRoomModel: ChatRoomModel): Promise<void> {
    await this.chatRoomApi.store(chatRoomModel);
  }

  async update(chatRoomModel: ChatRoomModel): Promise<void> {
    await this.chatRoomApi.update(chatRoomModel);
  }
}

export { ChatRoomController };
