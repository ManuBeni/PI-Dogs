const {Router} = require('express')
const router = Router()

router.get('/', (req, res, next) => {
    res.send('soy get /dog')
})

router.post('/', (req, res, next) => {
    res.send('soy post /dog')
})

router.put('/', (req, res, next) => {
    res.send('soy put /dog')
})

router.delete('/', (req, res, next) => {
    res.send('soy delete /dog')
})

module.exports = router;