const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Lista de proveedores');
});
router.post('/', (req, res) => {
    res.send('Crear un proveedor');
}
);
router.patch('/:id', (req, res) => {
    res.send(`Modificar proveedor con ID ${req.params.id}`);
}
);
router.delete('/:id', (req, res) => {
    res.send(`Eliminar proveedor con ID ${req.params.id}`);
}
);
module.exports = router;
