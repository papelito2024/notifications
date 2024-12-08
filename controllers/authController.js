import database from "../database.js"
import bcrypt from "bcrypt"


class AuthController {
    constructor(parameters) {
        
    }

    async login(req, res) {
        try {

         
           const user =  await database.select("users",{},{
                username:"admin12"
            })

           if(!user) res.render("login",{title:"login",message:"credenciales malotas"})

            const match =  await  bcrypt.compare("putita12",user.password)

            if (!match) res.render("login", { title: "login", message: "credenciales malotas" })
                

            res.render("login", { status: "registerd", message: "usuario loggeadoo exitosamente" })

        } catch (error) {
            console.log(error)
            res.render("login", { message: "error guachiing jeje" })
        }

    }

   async  register(req,res){
    try {
        
       
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash("putita12",salt)

        await database.insert("users", {
            username: "user233",
            password: hash
        })

     

        res.render("register", { status: "registerd", message: "usuario registrado exitosamente" })

    } catch (error) {
        console.log(error)
        res.render("register",{message:"error guachiing jeje"})
    }
      
    }
}


export default AuthController