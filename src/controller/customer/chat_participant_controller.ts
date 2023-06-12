import { ChatParticipantApi } from "../../api/customer/chat_participant_api";
import { ChatParticipantModel } from "../../model/chat_participant_model";

class ChatParticipantController {
  private chatParticipanApi = new ChatParticipantApi();

  async index(chatRoomId: string): Promise<ChatParticipantModel[]> {
    const chatParticipants = await this.chatParticipanApi.index(chatRoomId);

    return chatParticipants;
  }

  async show(
    chatRoomId: string,
    userType: string
  ): Promise<ChatParticipantModel | undefined> {
    const chatParticipant = await this.chatParticipanApi.show(
      chatRoomId,
      userType
    );

    return chatParticipant;
  }

  async store(chatParticipantModel: ChatParticipantModel): Promise<void> {
    await this.chatParticipanApi.store(chatParticipantModel);
  }
}

export { ChatParticipantController };
