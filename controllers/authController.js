import database from "../database.js"
import bcrypt from "bcrypt"


class AuthController {
    constructor(parameters) {
        
    }

    async login(req, res) {
        try {

         
           const user =  await database.select("users",null,{
                username:req.body.username
            })

           if(!user)return  res.render("login",{title:"login",message:"credenciales malotas"})

            const match =  await  bcrypt.compare("putita12",user.password)

            if (!match) return  res.render("login", { title: "login", message: "credenciales malotas" })
                
            console.log(user)

            req.session.user={
                username:user.username,
                id:user.id
            }

            console.log(req.session.user)
           
            res.redirect("/")
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
            username: req.body.username,
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