const express = require("express");
const connectDB = require("./db/connect");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const notFound = require("./middlewares/notFound");
const handleError = require("./middlewares/handleError");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");
const authRoute = require("./routes/authRoute");
const friendRoute = require("./routes/friendRoute");
const fileUploadRoute = require("./routes/fileUploadRoute");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");
const { createServer } = require("http");
require("dotenv").config();

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://127.0.0.1:5173"
  },
});

const port = process.env.PORT || 3000;

// middleware
// app.use(helmet());

app.use(express.json());

app.use(cookieParser());

app.use(morgan("dev"));

app.use(cors(corsOptions));

const allowCors = (fn) => async (req, res, next) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  // res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5173");
  // another common pattern
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  return await fn(req, res, next);
};

app.get("/", (req, res) => res.send("<h1>Hello World</h1>"));

// api end points
app.use("/users", allowCors(userRoute));
app.use("/posts", allowCors(postRoute));
app.use("/auth", allowCors(authRoute));
app.use("/upload", allowCors(fileUploadRoute));
app.use("/friends", allowCors(friendRoute));
app.use(notFound);

app.use(handleError);

// Socket
let onlineUsers = [];

const addNewUser = (userId, socketId) => {
  !onlineUsers.some((user) => user.userId === userId) &&
    onlineUsers.push({ userId, socketId });
};

const getUser = (userId) => {
  return onlineUsers.find((user) => user.userId === userId);
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

io.on("connection", (socket) => {
  console.log("socket connected");
  socket.on("newUser", ({ userId }) => {
    addNewUser(userId, socket.id);
  });

  socket.on(
    "sendNotification",
    ({ currentUserId, currentuserName, postId, userId }) => {
      const reciever = getUser(userId);
      io.to(reciever?.socketId).emit("getNotification", {
        currentUserId,
        currentuserName,
        postId,
      });
    }
  );

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

/**
 * @desc start server
 */
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    console.log("DataBase Connected");
    httpServer.listen(port, () =>
      console.log(`server is running on port ${port}`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
