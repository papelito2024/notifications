import express from 'express';



import cors from "cors";
import path from "path";
import morgan from 'morgan';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();


app.set('view engine', 'ejs');

// Definir la carpeta donde se encuentran las vistas (opcional, pero recomendable)
app.set('views', path.join(__dirname, 'views'));


app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(morgan())


import authRouter from './routes/auth.js';
app.use("/auth",authRouter)

app.get('/', (req, res) => {
    res.render("index", { title: "index", message: "nose" })
});






export default app