import mongoose from "mongoose";
import { config } from "./config.js";

export const connectBD = async() =>{
    try {
        await mongoose.connect(config.mongo.url);
        console.info("Base de datos conectada");
    } catch (error) {
        console.info(`Error el conectar la DB ${error.message}`);
    }
}