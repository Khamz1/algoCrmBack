const Product = require("../Models/Product.model")
module.exports.productsController = {
    getProducts: async (req, res) => {
        try{
            const productsList = await Product.find({})
            res.json(productsList)
        }
        catch(err){res.json('error')}
    },
    addProduct: async (req, res) => {
        Product.create({
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            left:req.body.left,
        }).then(()=>{
            res.json("Продукт добавлен")
        })
    },
    deleteProduct: async (req, res) => {
        Product.findAndRemove(req.params.id)
            .then(()=>res.json(`Удаление студента с ID ${req.params.id}`))
    },
    changeProducts: async (req, res) => {
        try {
            const changeProduct = await Student.findByIdAndUpdate(
                req.params.id,
                { title: req.body.title },
                { new: true });
            res.json(changeProduct)
        }
        catch (err) { res.json("error") }
    }
}
