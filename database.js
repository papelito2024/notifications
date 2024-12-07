
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

          //  console.log(r)
      } catch (error) {
        console.log(error)
      }
    }


    async insert(table,values){

        try {
            
            const keys = Object.keys(values)
            const vals = Object.values(values)
           
            await this.db.run(`INSERT INTO ${table} (${keys.join(",")}) VALUES (${vals.join(",")})`);
        } catch (error) {
            console.log(error)
        }
       
    }


    async update(table,set,condition){

        try {

            const key = Object.keys(condition)[0]

            await this.db.run(`UPDATE TABLE ${table} SET  ${this.set(set)} WHERE ${key}=${condition[key]} `);
        } catch (error) {
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