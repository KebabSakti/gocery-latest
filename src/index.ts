require("dotenv").config();

import cors from "cors";
import express from "express";
import http from "http";
import { DbService } from "./common/helper/db_service";
import { FirebaseAdminService } from "./common/helper/firebase_service";
import { SocketIoService } from "./common/helper/socket_io_service";
import { Utility } from "./common/helper/utility";
import { CourierAuthController } from "./controller/courier/courier_auth_controller";
import { ChatMessageController } from "./controller/customer/chat_message_controller";
import { ChatParticipantController } from "./controller/customer/chat_participant_controller";
import { ChatRoomController } from "./controller/customer/chat_room_controller";
import { CustomerAuthController } from "./controller/customer/customer_auth_controller";
import { CartModel } from "./model/cart_model";
import { ChatMessageModel } from "./model/chat_message_model";
import { ChatParticipantModel } from "./model/chat_participant_model";
import { ChatRoomModel } from "./model/chat_room_model";
import customerAccount from "./view/v1/customer/customer_account";
import customerAuth from "./view/v1/customer/customer_auth";
import customerAuthMiddleware from "./view/v1/customer/customer_auth_middleware";
import customerCarts from "./view/v1/customer/customer_cart";
import customerCategories from "./view/v1/customer/customer_category";

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
    const customerAuthController = new CustomerAuthController();
    const courierAuthController = new CourierAuthController();
    const { token, level } = socket.handshake.auth;

    if (level == "customer") {
      await customerAuthController.verify(token);
    }

    if (level == "courier") {
      await courierAuthController.verify(token);
    }

    next();
  } catch (error) {
    next(error);
  }
});

io.on("connection", async (socket) => {
  try {
    const chatRoomController = new ChatRoomController();
    const chatParticipantController = new ChatParticipantController();
    const chatMessageController = new ChatMessageController();

    socket.on("room:create", (chatRoomModel: ChatRoomModel) => {
      chatRoomController.store({
        ...chatRoomModel,
        created: Utility.nowSqlTimestamp(),
        updated: Utility.nowSqlTimestamp(),
      });
    });

    socket.on("room:join", (chatParticipantModel: ChatParticipantModel) => {
      socket.join(chatParticipantModel.chatRoomId!);

      chatParticipantController.store({
        ...chatParticipantModel,
        id: Utility.uuid(),
        created: Utility.nowSqlTimestamp(),
        updated: Utility.nowSqlTimestamp(),
      });
    });

    socket.on("chat", (chatMessageModel: ChatMessageModel) => {
      io.to(chatMessageModel.chatRoomId!).emit("message", chatMessageModel);

      chatMessageController.store({
        ...chatMessageModel,
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

  const payload: CartModel = {
    id: Utility.uuid(),
    customerId: "Ayor3aeBApSJ8zeQleCsdJk8gSM2",
    productId: "01dbc28d-c779-4ad9-afcd-78ba0a31fd7f",
    qty: 1,
    total: 1000,
    created: Utility.nowSqlTimestamp(),
    updated: Utility.nowSqlTimestamp(),
  };

  await db<CartModel>("carts").insert(payload);

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

//customer
app.use("/api/v1/customer/app", customerAuthMiddleware);
app.use("/api/v1/customer/auth", customerAuth);
app.use("/api/v1/customer/app/accounts", customerAccount);
app.use("/api/v1/customer/app/categories", customerCategories);
app.use("/api/v1/customer/app/carts", customerCarts);

//route not found 404
app.use("*", (_, res) => res.status(404).json("Route path not found"));

server.listen(port);
