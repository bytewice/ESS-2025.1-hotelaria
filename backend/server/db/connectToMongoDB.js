import mongoose from "mongoose"; // BANCO DE DADOS MONGODB

const connectToMongoDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log("Successfully connected to MongoDB")
    } catch (error){
        console.log("Error connecting to MongoDB:", error.message)
    }
}

export default connectToMongoDB