import mongoose from 'mongoose';

const connection = {};
//hooking up to our db.  you need to make a .env.local with the MONGO_URI variable pointing to your db
async function dbConnect() {
    if (connection.isConnected) return;

    const db = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });

    connection.isConnected = db.connections[0].readyState;
    console.log(`readyState: ${connection.isConnected}`);
}

export default dbConnect;