interface ChatMessageModel {
  id?: string;
  chatRoomId?: string;
  userId?: string;
  userName?: string;
  userType?: string;
  message?: string;
  read?: boolean;
  created?: string;
  updated?: string;
}

export { ChatMessageModel };
