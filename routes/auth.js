
import { Router } from "express";


const authRouter = new Router();

import AuthController from "../controllers/authController.js";

const auth = new AuthController()



authRouter.get("/login", (req, res) => res.render("login", { title: "login", message: undefined }))


authRouter.post("/login",auth.login)




authRouter.get("/register",(req,res)=>res.render("register",{title:"register",message:undefined}))


authRouter.post("/register",auth.register)



export default authRouter