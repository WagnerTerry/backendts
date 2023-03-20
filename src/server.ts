// import packages
import { Request, Response } from "express";

const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const cors = require('cors')
const PORT: Number = 3000;
const mongoose = require('mongoose')

// middleware
const app = express()
app.use(cors())
app.use(express.json())

// routes
app.get("/health", (req: Request, res: Response) => {
    res.status(200).send({ message: "api ok" })
})

// connection

if (process.env.DB_DEV === "devs") {
    console.log("conectado ambiente dev")
    mongoose.connect("mongodb://localhost:27017/mercado_juca",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        (error: string) => {
            if (error) {
                console.log("erro ao conectar mongodb", error)
            } else {
                console.log("Conectado ao mongodb de desenvolvimento")
            }
        })
    app.listen(3002, () => console.log("server is running on port 3002"))
} else {
    const PORT = process.env.PORT || 3001;
    const DB_USER = process.env.DB_USER
    const DB_PASSWORD = process.env.DB_PASSWORD
    mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.s1vojih.mongodb.net/?retryWrites=true&w=majority`)
        .then(() => {
            console.log("Conectado ao MongoDB de produção", PORT)
            app.listen(PORT)
        })
        .catch((error: string) => console.log(error))
}


// app.listen(PORT, () => {
//     console.log(`server is running on port ${PORT}`)
// })