const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
// API KEY
require('dotenv').config();
const { API_KEY } = process.env;
// Routes
const dogsRoute = require('./dogs')
const dogRoute = require('./dog')
const tempersRoute = require('./tempers')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/dogs', dogsRoute) // /api/characters
router.use('/dog', dogRoute) // /api/dog
router.use('/temperament', tempersRoute) // /api/temperament

module.exports = {router};
