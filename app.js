import express from 'express';



import cors from "cors";
import path from "path";
import morgan from 'morgan';
import session from "express-session";
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



app.use(session({
    secret: 'mi_clave_secreta', // Se recomienda una clave secreta larga y aleatoria
    resave: false,              // No resguardar la sesión si no se ha modificado
    saveUninitialized: false,   // No guardar sesiones nuevas sin inicializar
    cookie: { secure: false }   // Asegúrate de configurar `secure: true` si usas HTTPS
}));



import authRouter from './routes/auth.js';
import indexRouter from './routes/index.js';







app.use("/auth", (req, res, next) => {

    console.log(req.session.user)
    if (!req.session.user) return next();

    return res.redirect("/");
},authRouter)


app.use("/", (req, res, next) => {

    console.log(session)
    if (req.session) return next();

    return res.redirect("/auth/login");
}, indexRouter)






app.use((req, res) => {
    res.send("nose econtro la ruta")
});










export default app