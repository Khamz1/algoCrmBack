const Purchase = require("../Models/Purchase.model")
const Product = require("../Models/Product.model")

module.exports.purchaseController = {
    getPurchase: async (req, res) => {
        try {
            const purchases = await Purchase.find().populate('productList.product').populate('userId');
            res.status(200).send(purchases);
        } catch (err) {
            res.status(500).send({ error: 'Ошибка при получении списка покупок' });
        }
    },
    getPurchaseById: async (req, res) => {
        try {
            const purchase = await Purchase.findById(req.params.id).populate('productList.product').populate('userId');
            if (!purchase) {
                return res.status(404).send({ error: 'Покупка не найдена' });
            }
            res.status(200).send(purchase);
        } catch (err) {
            res.status(500).send({ error: 'Ошибка при получении покупки' });
        }
    },
    addPurchase: async (req, res) => {
        try {
            const { total, productList, userId } = req.body;

            for (const item of productList) {
                const product = await Product.findById(item.product);
                if (!product) {
                    return res.status(404).send({ error: `Продукт с ID ${item.product} не найден` });
                }
            }

            const purchase = new Purchase({ total, productList, userId });
            await purchase.save();
            res.status(201).send(purchase);
        } catch (err) {
            res.status(400).send({ error: 'Ошибка при создании покупки', details: err.message });
        }
    },
    deletePurchase: async (req, res) => {
        try {
            const purchase = await Purchase.findByIdAndDelete(req.params.id);
            if (!purchase) {
                return res.status(404).send({ error: 'Покупка не найдена' });
            }
            res.status(200).send({ message: 'Покупка успешно удалена' });
        } catch (err) {
            res.status(500).send({ error: 'Ошибка при удалении покупки' });
        }
    }
}
