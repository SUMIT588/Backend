import { DB_NAME } from "../constants.js";
import mongoose from "mongoose";

const dbConnect = async ()=> {
 try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}}`);
    console.log(`Database connected : ${connectionInstance.connection.host}`)
 } catch (error) {
    console.log(process.env.MONGODB_URL, 'env')
    console.log(`Database error : ${error}`)
 }
}


export default dbConnect;