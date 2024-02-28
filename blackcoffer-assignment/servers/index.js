const mongoose = require("mongoose");

// Schema

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
  },
});
const user = mongoose.model("user", userSchema);

// connect
mongoose
  .connect("mongodb://127.0.0.1:27017/blackcoffer")
  .then(() => {
    console.log("MongoDB Conected");
  })
  .catch((err) => console.log("Mongo Error", err));

// const express = require("express");
// const server = express();

// server.get('/demo',(request,response)=>{

//     response.send('hello');
// });

// server.listen(500, () => {

//   console.log("SErver Started");
// });
// console.log("Hello");
