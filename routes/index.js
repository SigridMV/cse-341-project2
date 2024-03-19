//Routes Setup
const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => { 
    //#swagger.tag=['Hello World']
    res.send('WELCOME TO CSE-341 / Sigrid Müller');
});

router.use('/movies', require('./movies'));


module.exports = router;