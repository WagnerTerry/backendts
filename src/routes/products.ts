import {Request, Response, NextFunction} from 'express'
const express = require('express')
const router = express.Router()
const Product = require('../models/Product')

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await Product.find()
        await Product.create(product)
        res.status(200).json(product)
    } catch(error){
        res.status(500).json({error})
    }
})

router.post("/", async (req: Request, res: Response) => {
    const {name, description, price, image} = req.body

    if(!name){
        res.status(422).json({message: "Campo name é obrigatório"})
    }

    const product = {
        name,
        description,
        price,
        image
    }

    try {
        await Product.create(product)
        res.status(201).json({message: "Produto cadastrado com sucesso!", product})
    } catch(error){
        res.status(500).json({error})
    }
})