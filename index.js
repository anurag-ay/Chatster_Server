const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const sockets = require("./sockets/socket");

// Calling inbuilt midleware
app.use(express.json());

const corsOptions = {
  origin: ["http://localhost:3000"],
  methods: ["GET", "PUT", "POST", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Importing controllers
const { home } = require("./controller/homeController");

// Conneting to the database
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Connected to the MongoDB..."))
  .catch((err) => console.log(err));

// importing routes
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/chats", require("./routes/chatRoute"));
app.use("/api/decodeToken", require("./routes/decodeTokenRoute"));
app.use("/api/searchUser", require("./routes/searchUserRoute"));

// creating Home route
app.get("/", home);

// Intializing Dynamic port
const port = process.env.PORT || 5000;

// Listening on Port
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

// Calling socket connection
sockets(server);
