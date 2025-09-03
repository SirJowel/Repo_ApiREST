
const express = require('express');
const app = express();
const port = 3000;
const productosRouter = require('./routes/productos');
const proveedoresRouter = require('./routes/proveedores');


app.use('/productos', productosRouter);
app.use('/proveedores', proveedoresRouter);



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    });