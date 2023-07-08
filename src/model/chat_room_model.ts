import { ChatMemberModel } from "./chat_member_model";
import { ChatMessageModel } from "./chat_message_model";

interface ChatRoomModel {
  id?: string;
  ended?: boolean;
  members?: ChatMemberModel[];
  chats?: ChatMessageModel[];
  created?: string;
  updated?: string;
}

export { ChatRoomModel };
