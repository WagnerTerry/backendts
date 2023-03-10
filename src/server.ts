import { Request, Response } from "express";

const express = require('express')
const cors = require('cors')
const PORT:Number = 3000;

// middleware
const app = express()
app.use(cors())
app.use(express.json())

// routes
app.get("/health", (req: Request, res: Response) => {
    res.status(200).send({message: "api ok"})
})

// connection
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})