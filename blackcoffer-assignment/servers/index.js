const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const apiRoutes = require("./routes/api");
// MongoDB connection
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/demo", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log("DB is Connected");
}

main().catch(err => console.log(err));

const app = express();
app.use(express.json());
app.use(cors());

// Start the server
 const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
});
app.use('/api', apiRoutes);


// CRUD - Create
// app.post('/save',async (req,res)=>{
     
//   let user = new Data();
//   user.intensity = 12;//req.body.username;
//   user.sector ='332'; //req.body.password;
//   const doc = await user.save();  

//   console.log(doc);
//   res.json(doc);
// })

// Route to get all data
// app.get("/demo", async (req, res) => {
//   try {
//     const userData = await Data.find({});
//     res.send(userData);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// const express = require("express"); //web server
// const mongooseServer = require("mongoose");
// const cors = require("cors");
// // const apiRoutes = require("./routes/api");
// // require('dotenv').config();
// main().catch((err) => console.log(err));
// async function main() {
//   // MongoDB connection
//   await mongooseServer.connect("mongodb://127.0.0.1:27017/demo");
//   console.log("DB is Connected");
// }
// // Schema
// const dataSchema = new mongooseServer.Schema({
//   end_year: String,
//   intensity: Number,
//   sector: String,
//   topic: String,
//   insight: String,
//   url: String,
//   region: String,
//   start_year: String,
//   impact: String,
//   added: String,
//   published: String,
//   country: String,
//   relevance: Number,
//   pestle: String,
//   source: String,
//   title: String,
//   likelihood: Number,
// });
// const Data = mongooseServer.model("blackcoffer", dataSchema);
// // module.exports = Data;

// const app = express(); //server
// app.use(express.json());
// app.use(cors()); //cors error detection middle-wire

// // // Routes
// // app.use('/api', apiRoutes);

// // // // Start the server
// const PORT = 8085;//process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// app.get("/demo", async (req, res) => {
//   const UserData = await Data.find({});
//   res.send(UserData);
// });
// // // XXSSS
// // const mongoose = require("mongoose");

// // // Schema

// // const userSchema = new mongoose.Schema({
// //   firstName: {
// //     type: String,
// //     require: true,
// //   },
// //   lastName: {
// //     type: String,
// //   },
// // });
// // const user = mongoose.model("user", userSchema);

// // // connect
// // mongoose
// //   .connect("mongodb://127.0.0.1:27017/blackcoffer")
// //   .then(() => {
// //     console.log("MongoDB Conected");
// //   })
// //   .catch((err) => console.log("Mongo Error", err));

// // // const express = require("express");
// // // const server = express();

// // // server.get('/demo',(request,response)=>{

// // //     response.send('hello');
// // // });

// // // server.listen(500, () => {

// // //   console.log("SErver Started");
// // // });
// // // console.log("Hello");
