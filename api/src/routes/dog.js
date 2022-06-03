const {Router} = require('express')
const router = Router()
const {Dog, Temper} = require('../db')

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
            tempers
        } = req.body

        // Create a new dog from that info.
        const newDog = await Dog.create({
            name,
            height,
            weight,
            life_span,
            tempers
        })

        // Find tempers on DB
        const tempersDB = await Temper.findAll({
            where: { name : tempers }
        })

        // Add DB tempers to created dog.
        newDog.addTempers(tempersDB)
        
        //resolve and send created dog.
        res.status(201).send(newDog)

    } catch (error) {

        next(error)
        
    }

})

router.put('/', (req, res, next) => {
    res.send('soy put /dog')
})

router.delete('/', (req, res, next) => {
    res.send('soy delete /dog')
})

module.exports = router;