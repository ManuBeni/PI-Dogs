const {Router} = require('express')
const router = Router()
const {Dog, Temperament} = require('../db')

router.get('/', (req, res, next) => {
    res.send('soy get /dog')
})

router.post('/', async (req, res, next) => {
    try {

        // Get info from body.
        let {
            name,
            height, 
            weight, 
            life_span,
            temperaments
        } = req.body

        // Create a new dog from that info.
        const newDog = await Dog.create({
            name,
            height,
            weight,
            life_span
        })

        // Find tempers on DB
        const tempersDB = await Temperament.findAll({
            where: { name : temperaments }
        })

        // Add DB tempers to created dog.
        newDog.addTemperaments(tempersDB)
        
        //resolve and send created dog.
        res.status(201).send(newDog)

    } catch (error) {

        next(error)
        
    }

})

// router.put('/', (req, res, next) => {
//     res.send('soy put /dog')
// })

 router.delete('/', async (req, res, next) => {
     let nameToDelete = req.body.name

     await Dog.destroy({
        where: { name: nameToDelete }
     })

     res.send(nameToDelete + " deleted from db")
 })

module.exports = router;