const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios')
const router = Router();
require('dotenv').config();
const {
    API_KEY
  } = process.env;
const dogsRoute = require('./dogs')
const dogRoute = require('./dog')
const tempersRoute = require('./tempers')
const { Dog, Temper } = require('../db')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/dogs', dogsRoute) // /api/characters
router.use('/dog', dogRoute) // /api/dog
router.use('/temperament', tempersRoute) // /api/temperament

module.exports = {router};
