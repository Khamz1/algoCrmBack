const Cart = require("../Models/Cart.model")
const User = require("../Models/User.model")
const Product = require("../Models/Product.model")
const Purchase = require("../Models/Purchase.model")

module.exports.cartController = {
    get: async (req, res) => {
        try {
            const data = await Cart.find({ userId: req.params.userId }).populate("userId").populate({
                path: "list.userId", // Указываем путь для populate
                model: "Product" // Указываем модель, на которую ссылается productId
            });
            res.json(data)
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    addToCart: async (req, res) => {
        try {
            const userId = req.params.userId;
            const productId = req.params.productId;
            const amount = req.body.amount || 1; // Количество товара (по умолчанию 1)

            // Находим продукт, чтобы получить его данные
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ message: "Продукт не найден" });
            }

            // Находим корзину
            const cart = await Cart.findOne({ userId: userId });
            if (!cart) {
                return res.status(404).json({ message: "Корзина не найдена" });
            }

            // Проверяем, есть ли уже такой продукт в корзине
            const existingProduct = cart.list.find(item => item._id.equals(productId));
            const currentAmount = existingProduct ? existingProduct.amount : 0; // Текущее количество в корзине

            // Проверяем, не превышает ли сумма текущего и добавляемого количества left
            if (currentAmount + amount > product.left) {
                return res.status(400).json({ message: `Нельзя добавить больше ${product.left} единиц товара` });
            }

            // Если продукт уже есть в корзине, увеличиваем amount
            if (existingProduct) {
                existingProduct.amount += amount;
            } else {
                // Если продукта нет в корзине, добавляем его с полной информацией
                cart.list.push({
                    _id: product._id,
                    title: product.title,
                    price: product.price,
                    description: product.description,
                    left: product.left,
                    amount: amount
                });
            }

            // Сохраняем обновлённую корзину
            const updatedCart = await cart.save();

            res.json(updatedCart);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    removeFromCart: async (req, res) => {
        try {
            const userId = req.params.userId;
            const productId = req.params.productId;

            // Находим корзину пользователя
            const cart = await Cart.findOne({ userId: userId });
            if (!cart) {
                return res.status(404).json({ message: "Корзина не найдена" });
            }

            // Находим продукт в корзине
            const productIndex = cart.list.findIndex(item => item._id.equals(productId));
            if (productIndex === -1) {
                return res.status(404).json({ message: "Продукт не найден в корзине" });
            }

            // Уменьшаем amount на 1
            cart.list[productIndex].amount -= 1;

            // Если amount стал 0, удаляем продукт из корзины
            if (cart.list[productIndex].amount <= 0) {
                cart.list.splice(productIndex, 1); // Удаляем продукт из массива
            }

            // Сохраняем обновлённую корзину
            const updatedCart = await cart.save();

            res.json(updatedCart);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    makePurchase: async (req, res) => {
        const userId = req.params.userId;
        try {
            const cart = await Cart.findOne({ userId });
            const user = await User.findById(userId);

            if (!cart || !user) {
                return res.status(404).json({ message: "Корзина или пользователь не найдены" });
            }

            const totalSum = cart.list.reduce((acc, item) => acc + (item.amount * item.price), 0);

            if (user.points - totalSum < 0) {
                return res.status(400).json({ message: `Не хватает баллов: ${(user.points - totalSum) * -1}` });
            }

            for (const item of cart.list) {
                await Product.findByIdAndUpdate(
                    item._id,
                    { $inc: { left: -item.amount } }
                );
            }

            const purchase = await Purchase.create({
                total: totalSum,
                productList: cart.list,
                userId,
            });

            cart.list = [];

            user.points -= totalSum;

            await user.save();
            await cart.save();

            res.json(purchase);
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