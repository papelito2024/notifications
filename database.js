
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// open the database file


class Database {
    constructor(parameters) {
        this.db 
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


    async select(table,fields=null,filter=null,joins=null) {

        try {

            let joinsQuery ="";
           
            if(joins){
                joinsQuery=this.joins2query(joins);
            }

            const keys = Object.keys(filter)

            console.log(filter)
           
            const query = `SELECT ${fields ?? "*"}  FROM ${table} ${joinsQuery ? joinsQuery : ""} WHERE ${keys[0]}=${filter[keys[0]]}`;
           

           const data =  await this.db.get(query);
        
            return data
        } catch (error) {
            console.log(error)
        }

    }

    parseJoin(join,table){

        const JOINS={
            "inner":"INNER"
        }

        return `${join.type? JOINS[join.type]: JOINS["inner"]} JOIN ${join.table} ON ${join.table}.${join.col}=${table}.id `        
    }

    
    joins2query(joins){

        let joinsStr = "";
        if (Array.isArray(joins)) {

            joinsStr = joins.map((e) => {
                return this.parseJoin(e)
            }).join(" ")
        }
        return joinStr;
    }
    

    async insert(table,values){

        try {
            
            const keys = Object.keys(values).map((e)=>`"${e}"`).join(",")
            const vals = Object.values(values).map((e) => `"${e}"`).join(",")
         
            await this.db.run(`INSERT INTO ${table} (${keys}) VALUES (${vals})`);
        } catch (error) {
           
            console.log(error)
        }
       
    }


    async update(table,set,condition){

        try {

            const key = Object.keys(condition)[0]

            await this.db.run(`UPDATE TABLE ${table} SET  ${this.set(set)} WHERE ${key}=${condition[key]} `);
        } catch (error) {
            console.log(error.trace)
            console.log(error)
        }


    }

   async  delete(table,condition){
        try {

          
            const key = Object.keys(condition)[0]

            await this.db.run(`DELETE FROM ${table} WHERE ${key}=${condition[key]} `);

            
        } catch (error) {
            console.log(error)
        }
        
    }

    set(set){
        
        let string =[]

        for(let field in set){
            
            string.push(`${field}="${set[field]}"`)
        }

        return string.join(",")
    }
}


export default  new Database()