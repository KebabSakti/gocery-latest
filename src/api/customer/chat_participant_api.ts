import { DbService } from "../../common/helper/db_service";
import { ChatParticipantModel } from "../../model/chat_participant_model";

class ChatParticipantApi {
  private db = DbService.instance();

  async index(chatRoomId: string): Promise<ChatParticipantModel[]> {
    const chatParticipants = await this.db<ChatParticipantModel>(
      "chat_participants"
    ).where("chatRoomId", chatRoomId);

    return chatParticipants;
  }

  async show(
    chatRoomId: string,
    userType: string
  ): Promise<ChatParticipantModel | undefined> {
    const chatParticipant = await this.db<ChatParticipantModel>(
      "chat_participants"
    )
      .where({ chatRoomId: chatRoomId, userType: userType })
      .first();

    return chatParticipant;
  }

  async store(chatParticipantModel: ChatParticipantModel): Promise<void> {
    await this.db<ChatParticipantModel>("chat_participants").insert(
      chatParticipantModel
    );
  }
}

export { ChatParticipantApi };
