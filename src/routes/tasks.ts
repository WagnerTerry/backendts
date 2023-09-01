import { Request, Response, NextFunction } from 'express'
const express = require('express')
const router = express.Router()
const Task = require('../models/Task')

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const task = await Task.find()
        await Task.create(task)
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.post("/", async (req: Request, res: Response) => {
    const { title, completed } = req.body

    if (!title) {
        res.status(422).json({ message: "Campo title é obrigatório" })
    }

    const task = {
        title,
        completed
    }

    try {
        await Task.create(task)
        res.status(201).json({ message: "Tarefa cadastrada com sucesso!", task })
    } catch (error) {
        res.status(500).json({ error })
    }
})

module.exports = router