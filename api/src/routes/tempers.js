const {Router} = require('express')
const router = Router()
const {Temper} = require('../db')
const axios = require('axios')
require('dotenv').config();
const {
    API_KEY
  } = process.env;

router.get('/', async (req, res, next) => {

    const allDataFromApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    
    const tempers = allDataFromApi.data.map(e => e.temperament)

    const eachTemper = tempers.map(el=>{
        if(el){
        const strEl = JSON.stringify(el)
        const each = strEl.slice(1,-1).split(', ')
        return each
        }
    })

    const diffTempers = [].concat(...eachTemper)

    diffTempers.forEach(e=>{
        if(e){
            Temper.findOrCreate({
                where: {name:e}
            })
        }
    })
    const allTempers = await Temper.findAll()
    res.send(allTempers)
})

router.post('/', async (req, res, next) => {
    try {

        let {name} = req.body
        const newTemper = await Temper.create({
            name
        })
        res.status(201).send(newTemper)
        
    } catch (error) {
        next(error)
    }
})

router.put('/', (req, res, next) => {
    res.send('soy put /temperament')
})

router.delete('/', (req, res, next) => {
    res.send('soy delete /temperament')
})

module.exports = router;