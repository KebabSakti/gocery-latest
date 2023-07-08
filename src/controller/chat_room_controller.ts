import { ChatMemberApi } from "../api/chat_member_api";
import { ChatMessageApi } from "../api/chat_message_api";
import { ChatRoomApi } from "../api/chat_room_api";
import { ChatRoomModel } from "../model/chat_room_model";
import { OptionModel } from "../model/option_model";

class ChatRoomController {
  private chatRoomApi = new ChatRoomApi();
  private chatMemberApi = new ChatMemberApi();
  private chatMessageApi = new ChatMessageApi();

  async index(userId: string, option?: OptionModel): Promise<ChatRoomModel[]> {
    let datas: ChatRoomModel[] = [];
    const chatRooms = await this.chatRoomApi.index(userId, option);

    await Promise.all(
      chatRooms.map(async (e) => {
        const chatMembers = await this.chatMemberApi.index(e.id!);
        const chatMessages = await this.chatMessageApi.index(e.id!);

        datas.push({ ...e, members: chatMembers, chats: chatMessages });
      })
    );

    return datas;
  }

  async store(chatRoomModel: ChatRoomModel): Promise<void> {
    await this.chatRoomApi.store(chatRoomModel);
  }

  async update(chatRoomModel: ChatRoomModel): Promise<void> {
    await this.chatRoomApi.update(chatRoomModel);
  }
}

export { ChatRoomController };
