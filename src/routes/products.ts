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
