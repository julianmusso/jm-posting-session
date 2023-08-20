import mongoose from "mongoose";

const connection = {}

export default async function dbConnect() {

    if (connection.isConnected) return;

    if (mongoose.connections.length > 0) {
        connection.isConnected = mongoose.connections[0].readyState;
        if (connection.isConnected === 1) {

            console.log("Its already connected")
            return;
        }
        await mongoose.disconnect();
        console.log("Disconnecting")
    }
    const db = await mongoose.connect(process.env.MONGODB_URI)

}


mongoose.connection.on("connected", () => {
    console.log("mongodb is connected")
})

mongoose.connection.on("error", (err) => {
    console.log(err)
})