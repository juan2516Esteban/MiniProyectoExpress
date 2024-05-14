const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const { createClient } = require("@libsql/client");
const cors = require('cors');

app.use(cors({ origin: 'http://localhost:4200' }));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


const client = createClient({
    url: "libsql://apiespress-juan2516esteban.turso.io",
    authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MTMyMzQyNDYsImlkIjoiMmQzZTdmMDctNzEzZC00MWVkLWE1N2EtNjgyZWRmNmQ3ODQ0In0.JO09Zg5wb-ZUjMUOhslS68gbZGdLbdXfuAo32mi_0Fry9naK4qUzH08L-uOAWrpkNy1YN_nHOJ69ITMkQlIeDg"
  });
  
const port = 8001;
  app.listen(port, () => {
    console.log('Listening on port ' + port);
  });

app.get('/Categorias', async (req , res) => {
    const value = await client.execute(`SELECT * FROM CategoryProduct ;`);
    res.json(value.rows)
  });