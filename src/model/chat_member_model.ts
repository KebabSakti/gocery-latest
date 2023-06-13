interface ChatMemberModel {
  id?: string;
  roomId?: string;
  memberId?: string;
  memberType?: string;
  memberName?: string;
  memberPhone?: string;
  memberImage?: string;
  memberFcm?: string;
  created?: string;
  updated?: string;
}

export { ChatMemberModel };
