
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// open the database file


class Database {
    constructor(parameters) {
        this.db 

        this.query
    }


    async connect(){
        try {
            
          this.db = await open({
                filename: 'test.db',
                driver: sqlite3.Database
            });
            console.log("database connected")
        } catch (error) {
            console.log(error)
        }
       
    }


   async  createTables(){

       
      try {
        const r=  await this.db.exec(`
         CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT
            
            
        )

        `);

         await this.db.exec(`
         CREATE TABLE IF NOT EXISTS sockets (
            id TEXT PRIMARY KEY ,
            user_id INTEGER,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )

        `);

         await this.db.exec(`
         CREATE TABLE IF NOT EXISTS notifications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT DEFAULT "SYSTEM",
            description TEXT,
            user_id INTEGER,
            status INTEGER DEFAULT 0,
            FOREIGN KEY (user_id) REFERENCES users (id)   
        )

        `);

      

          //  console.log(r)
      } catch (error) {
        console.log(error)
      }
    }


     select(table,fields=null) {

        this.query=`SELECT ${fields?? "*"} FROM ${table} `

        return this
    }

    parseJoin(join,table){

        const JOINS={
            "inner":"INNER"
        }

        return `${join.type ? JOINS[join.type] : JOINS["inner"]} JOIN ${join.table} ON   ${table}.${join.equal}=${join.table}.${join.col}`        
    }

    
    joins2query(joins,table){

        let joinsStr = "";
        if (Array.isArray(joins)) {

            joinsStr = joins.map((e) => {
                return this.parseJoin(e,table)
            }).join(" ")
        }
        else{
            joinsStr = this.parseJoin(joins,table)
        }
        console.log(joinsStr)
        return joinsStr;
    }
    

    insert(table,values){
            const keys = Object.keys(values).map((e)=>`"${e}"`).join(",")
            const vals = Object.values(values).map((e) => `"${e}"`).join(",")
         
            this.query=`INSERT INTO ${table} (${keys}) VALUES (${vals})`;


       return this
       
    }


    async update(table){

       
            this.query=`UPDATE ${table} `
      

        return this
    }

   async  delete(table){
 
     this.query=`DELETE FROM ${table} `

      return this
        
    }

    set(colums){
        
        let string =[]

        for(let field in colums){
            
            string.push(`${field}='${colums[field]}'`)
        }

        this.query += `SET ${string.join(",")} `

        return this
    }

    order(colum,flow="ASC"){

        this.query+=`ORDER BY ${colum} ${flow} `
        return this
    }

    limit(val){
        this.query+=`LIMIT ${val} `
        return this
    }


    skip(val) {
        this.query += `OFFSET ${val} `
        return this
    }


    where(field){

        this.query+=`WHERE ${field}`

        return this
    }


    group(colums){

        this.query+=`GROUP BY ${colums.join(",")} `

        return this
    }

    innerJoin(table,col,col2){

        const table1 = this.query.match(/FROM\s[A-Za-z]+/)[0].split(" ")[1]

       
        this.query+=`JOIN ${table} ON ${table1}.${col}=${table}.${col2} `

        return this
    }

    equal(value){

        this.query += `='${value}' `

        return this
    }

    in(values){

        this.query+=` IN (${values.join(",")}) `

        return this
        
    }

    like(value){
        this.query += `LIKE %${value}%`

        return this
    }


    async execute(){
        try {  

            var query;
             console.log(this.query)
            if (this.query.startsWith("SELECT"))query= this.db.get(this.query);
            else query =this.db.run(this.query)
            
             const data = await query
            console.log(data) 
           return data
        } catch (error) {
            console.log(error)
        }
        
    }
    
}


   var db = new Database()

   



export default db

