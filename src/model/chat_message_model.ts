interface ChatMessageModel {
  id?: string;
  roomId?: string;
  userId?: string;
  message?: string;
  messageType?: string;
  read?: boolean;
  memberType?: string;
  memberName?: string;
  memberPhone?: string;
  memberImage?: string;
  created?: string;
  updated?: string;
}

export { ChatMessageModel };
