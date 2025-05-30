import mongoose from "mongoose";

const mongoUri = "mongodb://localhost:27017/proyecto5toA";
//                        //<user>:<pass><puertos>/nombredelaDB SINO sirve es /proyecto?authSource=admin
// mongoUriLocal = "mongodb://localhost:27017/proyecto"
const connectDB = async():Promise<void> => {
    try {
        await mongoose.connect(mongoUri);
        console.log("Conexión a mongo")
    }
    catch (error) {
        console.log("Error de conexión : ", error)
    }
};

export default connectDB;