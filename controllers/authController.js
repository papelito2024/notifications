import database from "../database.js"
import bcrypt from "bcrypt"


class AuthController {
    constructor(parameters) {
        
    }


   async  register(req,res){

        const sal =await  bcrypt.genSalt(10) 
        const hash = await bcrypt.hash("putita12")

        await database.insert("users",{
            username:"admin12",
            password:hash
        })

    }
}


export default AuthController