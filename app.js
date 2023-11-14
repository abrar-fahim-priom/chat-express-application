//external imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");

//internal imports
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler");
const loginRouter = require("./routers/loginRouter");
const inboxRouter = require("./routers/inboxRouter");
const usersRouter = require("./routers/usersRouter");

const app = express();
dotenv.config();

//database connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("Connection to MongoDB successful");

    // Additional error handling for MongoDB connection
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });
  })
  .catch((err) => console.error(err));

//request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//view engine setup
app.set("view engine", "ejs");

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

//routing setup
app.use("/", loginRouter);
app.use("/inbox", inboxRouter);
app.use("/users", usersRouter);

//404 error handling          //if want to modify default error handler write as last middleware and write any other before that
app.use(notFoundHandler);

//default error handler
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
