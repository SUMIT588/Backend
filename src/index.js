// require("dotenv").config();

import { app } from "./app.js";
import dbConnect from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./env",
});
dbConnect().then(()=>{
  app.listen(process.env.PORT || 3000, () =>{
    console.log(`Server is running at port : ${process.env.PORT} `)
  })
}).catch((err) => {
  console.log("MONGO DB connection error !!! : ",err)
});

// const app = express();
// (async () => {
//   try {
//     mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
//     app.on("error", (error) => {
//       console.log("ERRR:", error);
//       throw error;
//     });

//     app.listen(process.env.PORT, () => {
//       console.log("App is listening on port 3000");
//     });
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// })();
