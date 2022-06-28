const {Router} = require('express')
const { Dog, Temperament } = require('../db')
const router = Router()
const axios = require('axios')
// API KEY
require('dotenv').config();
const { API_KEY } = process.env;


const getApiData = async () => {
    
    const apiURL = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)

    const apiData = await apiURL
    .data
    .map((
        {
            id, 
            name, 
            height, 
            weight, 
            temperament, 
            life_span, 
            image 
        }) => {
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
            model: Temperament,
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

        // Gets the 'name' query, if there is one
        const queryName = req.query.name
        const allData = await getAllData()
    
        // If a 'name' query exists in the url, we get all occurrences (in api or DB).
        if(queryName){
            let dogas = allData.filter(el=>el.name == queryName)
            console.log(dogas)
            let dogName = allData.filter(el=>{
                let name = el.name.toLowerCase()
                let querys = queryName.toLowerCase()
                return name === querys
            })
            console.log("..............")
            console.log(dogName)
    
            dogName.length ?
            res.status(200).send(dogName) : 
            res.status(404).send('There is no dog with that name :(')
            
        } else {

        // Else, we send all data on api and DB dogs.
        res.status(200).send(allData)

        }
    } catch (error) {
        next (error)
    }
})

router.get('/:id', async (req, res, next)=>{
    // Gets the id parameter from the url
    const id = req.params.id

    // Gets all dogs
    const allDogs = await getAllData()

    // If it gets an id, it filters all the dogs and resolve with the found dog.
    // If there is no dog with that ID, It throws a 404 error. 
    if(id){

        let dogID = await allDogs.filter(el => el.id == id)

        dogID.length ?
        res.status(200).send(dogID) :
        res.status(404).send('No existe un perro con ese ID :(')

    }

})

// router.post('/', async (req, res, next) => {

//     res.send('soy post /dogs')

// })

// router.put('/', (req, res, next) => {
//     res.send('soy put /dogs')
// })

// router.delete('/', (req, res, next) => {
//     res.send('soy delete /dogs')
// })

module.exports = router;