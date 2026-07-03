// const express = require("express");
// const mongoose = require("mongoose");

// const app = express();

// app.use(express.json());

// mongoose.connect("mongodb://127.0.0.1:27017/HotelParadise")
// .then(() => {
//     console.log("MongoDB Connected");
// })
// .catch((err) => {
//     console.log(err);
// });

// app.get("/", (req, res) => {
//     res.send("Server Works");
// });

// app.listen(3000, () => {
//     console.log("Server running on port 3000");
// });
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const roomTypeRouter = require('./routers/roomTypeRouter');
const roomRouter = require('./routers/roomRouter');
//const moddle = require('./middleware/isPost');

const app = express();
//process.env.MONGO_URI
mongoose.connect("mongodb://127.0.0.1:27017/HotelParadise")
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB error:', err));

app.use(cors());
app.use(express.json());
app.use(roomTypeRouter);
app.use(roomRouter);
app.use('/uploads', express.static('uploads'));

app.listen(3000, () => {
  console.log("Your server is listening on port 3000");
});