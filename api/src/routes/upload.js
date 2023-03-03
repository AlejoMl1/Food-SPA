const { Router } = require('express');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.post('/', async function(req, res, next){


    return res.send('Entre a post')
})

module.exports = router;
