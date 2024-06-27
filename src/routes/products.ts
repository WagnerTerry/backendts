import { Request, Response, NextFunction } from "express";
import { Category } from "../enum";
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await Product.find();
    await Product.create(product);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/", async (req: Request, res: Response) => {
  const { name, description, price, image, category } = req.body;

  if (!name || !category || !Object.values(Category).includes(category)) {
    return res.status(422).json({
      message: "Campos name e category são obrigatórios",
    });
  }

  const product = {
    name,
    description,
    price,
    image,
    category,
  };

  try {
    await Product.create(product);
    res
      .status(201)
      .json({ message: "Produto cadastrado com sucesso!", product });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, description, price, image, category } = req.body;
  const product = {
    name,
    description,
    price,
    image,
    category,
  };

  try {
    const updateProduct = await Product.updateOne({ _id: id }, product);

    if (updateProduct.matchedCount === 0) {
      res.status(422).json({ message: "Produto não encontrado" });
      return;
    }
    res.status(204).json(product);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    await Product.deleteOne({ _id: id });

    res.status(202).json({ message: "Produto removido com sucesso" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
