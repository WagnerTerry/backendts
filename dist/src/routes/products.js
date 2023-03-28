"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
router.get("/", async (req, res, next) => {
    try {
        const product = await Product.find();
        await Product.create(product);
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
router.post("/", async (req, res) => {
    const { name, description, price, image } = req.body;
    if (!name) {
        res.status(422).json({ message: "Campo name é obrigatório" });
    }
    const product = {
        name,
        description,
        price,
        image
    };
    try {
        await Product.create(product);
        res.status(201).json({ message: "Produto cadastrado com sucesso!", product });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const { name, description, price, image } = req.body;
    const product = {
        name,
        description,
        price,
        image
    };
    try {
        const updateProduct = await Product.updateOne({ _id: id }, product);
        if (updateProduct.matchedCount === 0) {
            res.status(422).json({ message: 'Produto não encontrado' });
            return;
        }
        res.status(204).json(product);
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await Product.deleteOne({ _id: id });
        res.status(202).json({ message: "Produto removido com sucesso" });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
module.exports = router;
