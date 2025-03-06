const User = require("../Models/User.model")
const Cart = require("../Models/Cart.model")

module.exports.userController = {

    add: async (req, res) => {
        try {
            const user = await User.create(req.body);
            await user.save();

            if (user.role === "student") {
                const cart = await Cart.create({ studentId: user._id })
                await cart.save()
            }

            res.json(user)
        } catch (error) {
            res.json(error)
        }
    },

    edit: async (req, res) => {
        try {
            const data = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
            res.json(data)
        } catch (error) {
            res.json(error)
        }
    },

    editPoints: async (req, res) => {
        try {
            const data = await User.findByIdAndUpdate(req.params.id, { points: req.body.points }, { new: true })
            res.json(data)
        } catch (error) {
            res.json(error)
        }
    },

    delete: async (req, res) => {
        try {
            const data = await User.findByIdAndDelete(req.params.id)
            res.json(data)
        } catch (error) {
            res.json(error)
        }
    }
}