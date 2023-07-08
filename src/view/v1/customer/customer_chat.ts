import express, { Request, Response } from "express";
import { ErrorHandler } from "../../../common/helper/failure";
import { Utility } from "../../../common/helper/utility";
import { ChatRoomController } from "../../../controller/chat_room_controller";
import { ChatMemberModel } from "../../../model/chat_member_model";
import { ChatMessageModel } from "../../../model/chat_message_model";
import { ChatRoomModel } from "../../../model/chat_room_model";

const router = express.Router();
const chatRoomController = new ChatRoomController();

router.get("/", async (req: Request, res: Response) => {
  try {
    const { id } = req.app.locals.user;
    const { current, limit } = req.query;
    const paginate = Utility.paginate(current as any, limit as any);

    const chatRooms = await chatRoomController.index(id, {
      paginate: paginate,
    });

    const chats: ChatRoomModel[] = [];

    chatRooms.map((e) => {
      const members: ChatMemberModel[] = e.members!.map((m) => {
        return {
          id: m.id,
          memberType: m.memberType,
          memberName: m.memberName,
          memberPhone: m.memberPhone,
          memberImage: m.memberImage,
        };
      });

      const messages: ChatMessageModel[] = e.chats!.map((g: any) => {
        return {
          id: g.chatMessageId,
          memberName: g.memberName,
          message: g.message,
          messageType: g.messageType,
          memberType: g.memberType,
          memberImage: g.memberImage,
          memberPhone: g.memberPhone,
        };
      });

      chats.push({
        id: e.id,
        ended: e.ended,
        members: members,
        chats: messages,
      });
    });

    res.json(chats);
  } catch (error: any) {
    new ErrorHandler(res, error);
  }
});

export default router;
