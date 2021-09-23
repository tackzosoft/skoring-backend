import cors from "cors";
import config from './config';
import helmet from "helmet";
import express from "express";
import bodyParser from "body-parser";

import routes from "./routes";
import { handler } from "./common";
import { bootstrap } from "./services";
import response from "./middleware/response";

const app = express();
const router = express.Router();

// third party middlewares
app.use(
  cors(), // handles cross origin resouce sharing
  bodyParser.json({ limit: "128kb" }), // parses the incoming requests
  bodyParser.urlencoded({ extended: false, limit: "2mb" }),
  helmet() // makes apps more secure
);

app.use(response);

app.use('/api', routes(router));
app.use(handler.invalidRoute, handler.errorHandler);

const server = app.listen(config.api.port);
server.on('listening',
  async function () {
    console.log("Success: Server Running on port", config.api.port);
    bootstrap();
  }
);