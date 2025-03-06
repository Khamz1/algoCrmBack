const Cart = require("../Models/Cart.model")

module.exports.cartController = {
    get: async (req, res) => {
        try {
            const data = await Cart.findById(req.params.studentId).populate("studentId");
            res.json(data)
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    addToCart: async (req, res) => {
        try {
            const userId = req.params.userId;
            const productId = req.params.productId;

            const updatedCart = await Cart.findByIdAndUpdate(
                userId,
                { $push: { list: productId } },
                { new: true }
            );

            if (!updatedCart) {
                return res.status(404).json({ message: "User not found" });
            }

            res.json(updatedUser);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    removeFromCart: async (req, res) => {
        try {
            const userId = req.params.userId;
            const productId = req.params.productId;

            const updatedCart = await Cart.findByIdAndUpdate(
                userId,
                { $pull: { list: productId } },
                { new: true }
            );

            if (!updatedCart) {
                return res.status(404).json({ message: "User not found" });
            }

            res.json(updatedUser);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    makeOrder: async (req, res) => {
        try {
            // Todo: создание покупки, вычет баллов

        } catch (error) {
            res.status(500).json({ error: error.message });

        }
    },

    delete: async (req, res) => {
        try {
            const data = await findByIdAndDelete(req.params.id)
            res.json(data)
        } catch (error) {
            res.json(error)
        }
    }
}