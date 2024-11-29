import mongoose from 'mongoose';

const connectDb = async () => {
    // Event listeners for connection events
    mongoose.connection.on('connected', () => {
        console.log("DB Connected");
    });

    mongoose.connection.on('error', (err) => {
        console.error("DB Connection Error:", err);
    });

    mongoose.connection.on('disconnected', () => {
        console.log("DB Disconnected");
    });

    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/Wishly`);
        console.log("Successfully connected to the database");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Exit the process with failure
    }
};

export default connectDb;