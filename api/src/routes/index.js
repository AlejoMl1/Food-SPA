const { Router } = require('express');
const recipes = require('./recipes.js');
const recipe = require('./recipe.js');
const types = require('./types.js');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();


router.use('/recipes', recipes);
router.use('/types', types);

router.get('/', async function(req, res, next){

    res.send('Welcome to the home route');
  })
// router.use('/recipe', recipe);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
