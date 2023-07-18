require("dotenv").config();

import cors from "cors";
import express from "express";
import http from "http";
import { faker } from "@faker-js/faker";
import { DbService } from "./common/helper/db_service";
import { FirebaseAdminService } from "./common/helper/firebase_service";
import { SocketIoService } from "./common/helper/socket_io_service";
import { Utility } from "./common/helper/utility";
import { AuthController } from "./controller/core/auth_controller";
import { ChatMemberController } from "./controller/core/chat_member_controller";
import { ChatMessageController } from "./controller/core/chat_messages_controller";
import { ChatRoomController } from "./controller/core/chat_room_controller";
import { ChatMemberModel } from "./model/chat_member_model";
import { ChatMessageModel } from "./model/chat_message_model";
import { ChatRoomModel } from "./model/chat_room_model";
import customerAccount from "./view/v1/customer/customer_account";
import customerAuth from "./view/v1/customer/customer_auth";
import customerAuthMiddleware from "./view/v1/customer/customer_auth_middleware";
import customerBanners from "./view/v1/customer/customer_banner";
import customerCarts from "./view/v1/customer/customer_cart";
import customerCategories from "./view/v1/customer/customer_category";
import customerChats from "./view/v1/customer/customer_chat";
import customerProducts from "./view/v1/customer/customer_product";
import { BannerModel } from "./model/banner_model";

const app = express();
const server = http.createServer(app);
const io = SocketIoService.init(server);
const port = 1001;

//init
FirebaseAdminService.init();

//global middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//websocket
io.use(async (socket, next) => {
  try {
    const authController = new AuthController();
    const token = socket.handshake.auth.token;
    const user = await authController.verify(token);

    socket.data.user = user;

    next();
  } catch (error) {
    next(error);
  }
}).on("connection", async (socket) => {
  try {
    const chatRoomController = new ChatRoomController();
    const chatMemberController = new ChatMemberController();
    const chatMessageController = new ChatMessageController();
    const { id, level } = socket.data.user;

    socket.on("room:create", async (chatRoomModel: ChatRoomModel) => {
      await chatRoomController.store({
        id: chatRoomModel.id,
        created: Utility.nowSqlTimestamp(),
        updated: Utility.nowSqlTimestamp(),
      });
    });

    socket.on("room:join", async (chatMemberModel: ChatMemberModel) => {
      socket.join(chatMemberModel.roomId!);

      await chatMemberController.store({
        ...chatMemberModel,
        id: Utility.uuid(),
        memberId: id,
        memberType: level,
        created: Utility.nowSqlTimestamp(),
        updated: Utility.nowSqlTimestamp(),
      });
    });

    socket.on("chat", async (chatMessageModel: ChatMessageModel) => {
      socket.to(chatMessageModel.roomId!).emit("message", chatMessageModel);

      await chatMessageController.store({
        ...chatMessageModel,
        id: Utility.uuid(),
        userId: id,
        created: Utility.nowSqlTimestamp(),
        updated: Utility.nowSqlTimestamp(),
      });
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/", async (req, res) => {
  // const cartController = new CartController();
  // const cart = await cartController.index("Ayor3aeBApSJ8zeQleCsdJk8gSM2");

  // console.log(cart);

  const db = DbService.instance();

  await Promise.all(
    [...Array(5)].map(async (e) => {
      await db<BannerModel>("banners").insert({
        id: Utility.uuid(),
        image: faker.image.food(),
        active: true,
        created: Utility.nowSqlTimestamp(),
        updated: Utility.nowSqlTimestamp(),
      });
    })
  );

  // const payload: CartModel = {
  //   id: Utility.uuid(),
  //   customerId: "Ayor3aeBApSJ8zeQleCsdJk8gSM2",
  //   productId: "01dbc28d-c779-4ad9-afcd-78ba0a31fd7f",
  //   qty: 1,
  //   total: 1000,
  //   created: Utility.nowSqlTimestamp(),
  //   updated: Utility.nowSqlTimestamp(),
  // };

  // await db<CartModel>("carts").insert(payload);

  // const categories = await db<CategoryModel>("categories");

  // await Promise.all(
  //   categories.map(async (category) => {
  //     [...Array(50)].map(async (_) => {
  //       await db<ProductModel>("products").insert({
  //         id: faker.datatype.uuid(),
  //         categoryId: category.id,
  //         name: faker.commerce.productName(),
  //         description: faker.commerce.productDescription(),
  //         image: faker.image.food(),
  //         price: Number(faker.commerce.price(1000, 50000)),
  //         unit: faker.science.unit().symbol,
  //         active: true,
  //         created: DateTimeService.nowSqlTimestamp(),
  //         updated: DateTimeService.nowSqlTimestamp(),
  //       });
  //     });
  //   })
  // );

  // await Promise.all(
  //   [...Array(10)].map(async (_) => {
  //     const bundleId = faker.datatype.uuid();

  //     await db<BundleModel>("bundles").insert({
  //       id: bundleId,
  //       name: faker.commerce.productName(),
  //       description: faker.commerce.productDescription(),
  //       active: true,
  //       created: DateTimeService.nowSqlTimestamp(),
  //       updated: DateTimeService.nowSqlTimestamp(),
  //     });

  //     [...Array(10)].map(async (_) => {
  //       const product = await db<ProductModel>("products")
  //         .orderByRaw("rand()")
  //         .first();

  //       await db<BundleProductModel>("bundle_products").insert({
  //         id: faker.datatype.uuid(),
  //         bundleId: bundleId,
  //         productId: product!.id,
  //         created: DateTimeService.nowSqlTimestamp(),
  //         updated: DateTimeService.nowSqlTimestamp(),
  //       });
  //     });
  //   })
  // );

  // const data = {
  //   token:
  //     "drVZRRZTRdSKGBit3MMGfF:APA91bF_aIhyC1rMrNbAmR9gv9xzV8Ygk9jp0qoOp38QPS8b0qGI12CnVPOTrJc5wdd0TuAFQgr8iMcUEbRYPh2LNYTZJPDy9TX42lJlgRKOjfqK0Ox-obi396aEfsAu8t2dIUfRjT45",
  //   data: {
  //     type: "chat",
  //   },
  //   notification: {
  //     title: "TES NOTIFICATION",
  //     body: "YOU GOT MESSAGE",
  //   },
  // };

  // await admin.messaging().send(data);

  res.json("SERVER UPPP!!");
});

//rest api customer
app.use("/api/v1/customer/app", customerAuthMiddleware);
app.use("/api/v1/customer/auth", customerAuth);
app.use("/api/v1/customer/app/accounts", customerAccount);
app.use("/api/v1/customer/app/categories", customerCategories);
app.use("/api/v1/customer/app/carts", customerCarts);
app.use("/api/v1/customer/app/chats", customerChats);
app.use("/api/v1/customer/app/banners", customerBanners);
app.use("/api/v1/customer/app/products", customerProducts);

//route not found 404
app.use("*", (_, res) => res.status(404).json("Route path not found"));

server.listen(port);
