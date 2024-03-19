//Routes Setup
const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => { 
    //#swagger.tag=['Hello World']
    res.send('Hello World');
});

router.use('/movies', require('./movies'));

router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = router;