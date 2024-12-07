
import { Router } from "express";


const authRouter = new Router();

import AuthController from "../controllers/authController.js";

const auth = new AuthController()

authRouter.post("/login",(req,res)=>{

    
})



authRouter.post("/register",auth.register)



export default authRouter