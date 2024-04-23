const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const { createClient } = require("@libsql/client");
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const client = createClient({
  url: "libsql://apiespress-juan2516esteban.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MTMyMzQyNDYsImlkIjoiMmQzZTdmMDctNzEzZC00MWVkLWE1N2EtNjgyZWRmNmQ3ODQ0In0.JO09Zg5wb-ZUjMUOhslS68gbZGdLbdXfuAo32mi_0Fry9naK4qUzH08L-uOAWrpkNy1YN_nHOJ69ITMkQlIeDg"
});

const port = 8000;
app.listen(port, () => {
  console.log('Listening on port ' + port);
});

app.get('/', async (req, res) => {
  res.json({mensaje: "funciona"})
});

app.get('/Productos', async (req, res) => {
  const value = await client.execute('SELECT * FROM Productos');
  res.json(value.rows)
});

app.post('/Productos', async (req, res) => {
  const value = await client.execute(` INSERT INTO Productos (id_productos, title, price, descripcion) VALUES ('${req.body.id_productos}' , '${req.body.title}', '${req.body.price}', '${req.body.description}'); `);
  res.json({mesaje: "Producto creado"})
});

app.delete('/Productos/:id',async (req, res) => {
  const parametro = req.params.id;
  const value = await client.execute(` DELETE FROM Productos WHERE id_productos = ${parametro}; `);
  res.json({mensaje: "El producto ha sido eliminado"})
});

app.put('/Productos/:id', async (req, res) => {
  const parametro = req.params.id;
  const value = await client.execute(` UPDATE Productos SET title = '${req.body.title}', price = ${req.body.price}, descripcion = '${req.body.description}' WHERE id_productos = ${parametro} ; `);
  res.json({mensaje: "El producto ha sido actualizado"})
});

