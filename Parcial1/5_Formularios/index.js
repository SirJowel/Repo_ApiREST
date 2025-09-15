const express = require('express');
const path = require('path');
const uploadRoutes = require('./routes/upload');
const cors = require('cors');
const app = express();
const port = 3001;

// Middleware para CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});
app.use(cors());
// Middleware para procesar formularios y JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Servir archivos subidos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ruta principal - servir el HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Usar rutas de upload
app.use('/', uploadRoutes);

// Manejo de errores de Multer
app.use((error, req, res, next) => {
    if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
            success: false,
            message: 'El archivo es demasiado grande. Máximo 5MB permitido.'
        });
    }
    
    if (error.code === 'LIMIT_FILE_COUNT') {
        return res.status(400).json({
            success: false,
            message: 'Demasiados archivos. Solo se permite un archivo a la vez.'
        });
    }
    
    if (error.message === 'Only images are allowed!') {
        return res.status(400).json({
            success: false,
            message: 'Solo se permiten archivos de imagen (JPG, JPEG, PNG, GIF).'
        });
    }
    
    res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});