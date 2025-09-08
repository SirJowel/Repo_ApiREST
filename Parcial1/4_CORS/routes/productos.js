const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send({info:'Lista de productos'});
});
router.post('/', (req, res) => {
    res.send({producto:'Crear un producto'});
});
router.patch('/:id', (req, res) => {
    res.send(`Modificar producto con ID ${req.params.id}`);
}
);
router.delete('/:id', (req, res) => {
    res.send(`Eliminar producto con ID ${req.params.id}`);
}
);
module.exports = router;