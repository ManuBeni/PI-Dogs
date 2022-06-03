const {Router} = require('express')
const { Dog, Temper } = require('../db')
const router = Router()
const axios = require('axios')
require('dotenv').config();
const {
    API_KEY
  } = process.env;

const getApiData = async () => {
    const apiURL = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    const apiData = await apiURL.data.map(({id, name, height, weight, temperament, life_span, image }) => {
        return {
            id: id,
            name: name,
            height: height.metric,
            weight: weight.metric,
            temperament: temperament,
            life_span: life_span,
            image: image.url
        }
    })

    return apiData;
}

const getDBData = async () => {
    return await Dog.findAll({
        include:{
            model: Temper,
            attributes: ['name'],
            through: {
                attributes:[]
            }
        }
    })
}

const getAllData = async() =>{

    const apiData = await getApiData()
    const dbData = await getDBData()

    const allData = apiData.concat(dbData)

    return allData;

}

router.get('/', async (req, res, next) => {

    try {
        const queryName = req.query.name
        const allData = await getAllData()
    
        if(queryName){
            let dogName = await allData.filter(el=>el.name.toLowerCase().includes(queryName.toLowerCase()))
    
            dogName.length ?
            res.status(200).send(dogName) : 
            res.status(404).send('No se encontró ningún perro con ese nombre :(')
        } else {
        res.status(200).send(allData)
        }
    } catch (error) {
        next (error)
    }
})

router.post('/', async (req, res, next) => {

    try {
        let {name, height, weight, life_span} = req.body
        const newDog = await Dog.create({
            name,
            height,
            weight,
            life_span
        })
    
        res.status(201).send(newDog)
    } catch (error) {
        next(error)
    }

})

router.put('/', (req, res, next) => {
    res.send('soy put /characters')
})

router.delete('/', (req, res, next) => {
    res.send('soy delete /characters')
})

module.exports = router;