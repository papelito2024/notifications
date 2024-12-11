
import { Router } from "express";

import database from "../database.js";

const indexRouter = new Router();


indexRouter.get("/", (req, res) =>{

    const notifications  = database.select("notifications",{},{
        user_id:2
    })

    res.render("index", { title: "index",notifications:notifications, message: undefined })
})




export default indexRouter