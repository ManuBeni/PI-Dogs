const {Router} = require('express')
const router = Router()
const {Temperament} = require('../db')
const axios = require('axios')
require('dotenv').config();
const {
    API_KEY
  } = process.env;

router.get('/', async (req, res, next) => {
    
    // Getting all the api's data
    const allDataFromApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`).catch((e)=>{console.log(e)})
    
    // Mapping for temperaments
    const tempers = allDataFromApi.data.map(e => e.temperament)

    // Unifying data in one array
    const eachTemper = tempers.map(el=>{
        if(el){
        const strEl = JSON.stringify(el)
        const each = strEl.slice(1,-1).split(', ')
        return each
        }
    })

    const diffTempers = [].concat(...eachTemper)

    // Adding each one to de DB, only if they don't exist already
    diffTempers.forEach(e=>{
        if(e){
            Temperament.findOrCreate({
                where: {name:e}
            })
        }
    })

    //Getting all the added temperaments
    const allTempers = await Temperament.findAll()
    res.send(allTempers)
})

router.post('/', async (req, res, next) => {
    try {

        // Getting new temperament name from body.
        let {name} = req.body

        // Creating new temper.
        const newTemper = await Temperament
        .create({ name })

        // Resolve and send the newly created temper.
        res.status(201).send(newTemper)
        
    } catch (error) {
        next(error)
    }
})

// router.put('/', (req, res, next) => {
//     res.send('soy put /temperament')
// })

router.delete('/', async (req, res, next) => {
    let nameToDelete = req.body.name

    await Temperament.destroy({
       where: { name: nameToDelete }
    })

    res.send(nameToDelete + " deleted from db")
})

module.exports = router;