import mongoose from "mongoose";

const connection: { isConnected?: number } = {};

async function connect() {
  if (connection.isConnected) return;
  try {
    const db = await mongoose.connect(process.env.MONGO_URL as string);
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log(error);
  }
}

export default connect;
