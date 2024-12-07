

import server from "./server.js";


import database from "./database.js";


async function dbinit(){
  await database.connect()

  await database.createTables()

}

dbinit()

import io from "./socket.js";





server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});



