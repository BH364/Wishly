import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body;
        console.log(req.body);

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User  not found" });
        }

        let cartData = userData.cartData || [];

        console.log(userData);

        let itemInCart = cartData.find(item => item.itemId === itemId);
        if (itemInCart) {
            // Check if the size already exists for this item
            let sizeInCart = itemInCart.sizes.find(s => s.size === size);
            if (sizeInCart) {
                // If size exists, increment the quantity
                sizeInCart.quantity += 1;
            } else {
                // If size does not exist, add it
                itemInCart.sizes.push({ size, quantity: 1 });
            }
        } else {
            // If item does not exist in cart, create a new entry
            cartData.push({
                itemId,
                sizes: [{ size, quantity: 1 }]
            });
        }

        // Update the user's cart in the database
        await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });
        res.json({ success: true, message: "Added to Cart" });
    } catch (err) {
        console.log(err.message);
        res.status(400).json({ success: false, message: err.message });
    }
}

const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;
        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User  not found" });
        }

        let cartData = userData.cartData || [];
        let itemInCart = cartData.find(item => item.itemId === itemId);
        if (itemInCart) {
            let sizeInCart = itemInCart.sizes.find(item => item.size === size);
            if (sizeInCart) {
                sizeInCart.quantity = quantity;
            } else {
                return res.status(400).json({ success: false, message: "Cannot find size" });
            }
        } else {
            return res.status(404).json({ success: false, message: "Item not found in cart" });
        }

        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Cart Updated" });
    } catch (err) {
        console.log(err.message);
        res.status(400).json({ success: false, message: err.message });
    }
}

const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body;
        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User  not found" });
        }

        const cartData = userData.cartData || [];
        res.json({ success: true, cartData });
    } catch (err) {
 console.log(err.message);
        res.status(400).json({ success: false, message: err.message });
    }
}

export { addToCart, updateCart, getUserCart };