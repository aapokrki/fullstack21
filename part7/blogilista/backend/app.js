const config = require("./utils/config");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");

const blogsRouter = require("./controllers/blogs.js");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

logger.info("connecting to ", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connection to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor);

morgan.token("body", (request) => {
  const bodyString = JSON.stringify(request.body);
  if (bodyString === "{}") {
    return " ";
  }
  return JSON.stringify(request.body);
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}
app.use(middleware.errorHandler);

module.exports = app;
