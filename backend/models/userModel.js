import mongoose from "mongoose";

// Define a schema for individual cart items
const cartItemSchema = new mongoose.Schema({
    size: { type: String, required: true },
    quantity: { type: Number, required: true, default: 1 }
});

// Define a schema for cart data
const cartDataSchema = new mongoose.Schema({
    itemId: { type: String, required: true },
    sizes: [cartItemSchema] // Array of cart items
});

// Define the user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cartData: {
        type: [cartDataSchema], // Array of cart data
        default: []
    }
}, { minimize: false, timestamps: true });

// Create or retrieve the user model
const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;