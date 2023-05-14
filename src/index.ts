import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import http from "http";
import { FirebaseAdminService } from "./common/helper/firebase_service";

const app = express();
const server = http.createServer(app);
const port = 1001;

//init
dotenv.config();
FirebaseAdminService.init();

//global middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.json("SERVER UPPP!!");
});

//route middleware
// app.use("/api/v1/customer/app", customerAuthMiddleware);

// //customer route
// app.use("/api/v1/customer/cities", customerCityApi);

//route not found 404
app.use("*", (_, res) => res.status(404).json("Route path not found"));

server.listen(port);
