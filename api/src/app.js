import express from "express";
import logger from "morgan";
import bodyParser from "body-parser";
import appConfigurations from "./config/appConfig";
import { updateLeads } from "./jobs/updateLeads.js";
import routes from "./routes";
import path from "path";
import cors from "cors";
// import isAuth from './middleware/isAuth';
appConfigurations();
updateLeads.start();

const app = express();
app.use(express.json());
app.use(cors());
app.options("*", cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(isAuth);
routes(app);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "../../frontend/build")));
  app.get("*", (request, response) => {
    response.sendFile(
      path.resolve(__dirname, "../../frontend/build", "index.html")
    );
  });
}

app.use((err, req, res, next) => {
  const { status, message } = err;
  let errorMessage = message;
  if (process.env.NODE_ENV !== "development" && status === 500) {
    errorMessage = "Internal Server Error";
  }
  res.status(status || 500);
  res.send({ error: true, message: errorMessage });
});

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

global.buildResponseData = ({ data = {}, statusCode = 200, message = "" }) => {
  return {
    data,
    message,
    statusCode,
  };
};

global.sendResponse = (responseObject, responseData) => {
  const { data, message, statusCode } = responseData;
  responseObject.status(statusCode);
  responseObject.send({
    data,
    message,
  });
};

module.exports = app;
