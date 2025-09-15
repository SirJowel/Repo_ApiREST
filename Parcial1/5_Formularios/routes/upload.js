const express = require('express');
const path = require('path');
const fs = require('fs');
const multerConfig = require('../utils/multer');

const router = express.Router();

// Ruta para subir archivos
router.post('/upload', multerConfig.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No se ha subido ningún archivo'
            });
        }

        // Obtener datos del formulario
        const { nombre, descripcion } = req.body;

        // Respuesta exitosa
        res.json({
            success: true,
            message: 'Archivo subido exitosamente',
            data: {
                nombre: nombre,
                descripcion: descripcion,
                archivo: {
                    filename: req.file.filename,
                    originalname: req.file.originalname,
                    mimetype: req.file.mimetype,
                    size: req.file.size,
                    url: `/uploads/${req.file.filename}`
                }
            }
        });
    } catch (error) {
        console.error('Error al subir archivo:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
});

// Ruta para obtener archivos subidos
router.get('/files', (req, res) => {
    const uploadsPath = path.join(__dirname, '../uploads');
    
    fs.readdir(uploadsPath, (err, files) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Error al leer la carpeta de uploads'
            });
        }
        
        const fileList = files.map(file => ({
            filename: file,
            url: `/uploads/${file}`
        }));
        
        res.json({
            success: true,
            files: fileList
        });
    });
});

module.exports = router;