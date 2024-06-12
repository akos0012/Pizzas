const express = require("express");
const router = express.Router();
const PizzaModel = require("./db/pizza.model");
const AllergenModel = require("./db/allergen.model");
const OrderModel = require("./db/order.model");
const ImageModel = require("./db/image.model");

//Pizza

router.get('/pizzas', async (req, res) => {
    PizzaModel.find().populate("allergens")
        .then((pizzas) => res.json(pizzas))
        .catch((error) => res.status(500).send(error));
});

router.get('/pizza/:id', async (req, res) => {
    PizzaModel.findById(req.params.id)
        .then((pizza) => res.json(pizza))
        .catch((error) => res.status(500).send(error));
});

router.post('/pizza', async (req, res, next) => {
    try {
        const img = req.body.img;
        let pizza = null;
        if (img) {
            const image = await ImageModel.create({ img });
            pizza = await PizzaModel.create({ ...req.body, img: image._id });
        } else {
            pizza = await PizzaModel.create(req.body);
        }
        res.status(201).json({ message: "New pizza uploaded", pizza });
    } catch (error) {
        next(error);
    }
});

router.delete('/pizza/:id', async (req, res) => {
    PizzaModel.findByIdAndDelete(req.params.id)
        .then(() => res.sendStatus(200))
        .catch((error) => res.status(500).send(error));
});


//Allergen

router.get('/allergens', async (req, res) => {
    AllergenModel.find()
        .then((allergen) => res.json(allergen))
        .catch((error) => res.status(500).send(error));
});

module.exports = router;

//Order

router.post('/order', async (req, res, next) => {

    const orderData = req.body;

    // Check if order is empty
    if (!orderData || Object.keys(orderData).length === 0) {
        return res.status(400).json({ message: "Empty order data" });
    }


    OrderModel.create(req.body)
        .then(() => res.status(201).json({ message: "New order uploaded...!" }))
        .catch((error) => next(error));
})

//Image

router.get('/image/:id', async (req, res) => {
    ImageModel.findById(req.params.id)
        .then((img) => res.json(img))
        .catch((error) => res.status(500).send(error));
})
