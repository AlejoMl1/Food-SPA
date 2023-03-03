const { Router } = require('express');
const { Recipe,Diet } = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.post('/', async function(req, res, next){

  let {title, summary, score,image ,healthy_score , steps, diets} = req.body
    if (!title) return res.status(400).send({error: 'Error! Title field is obligatory'})
    if (!summary) return res.status(400).send({error: 'Error! Summary field is obligatory'})

    const recipeCreated = await Recipe.create({            // estas tienen que estar definidas
      title,
      summary, 
      score,
      image,
      healthy_score, 
      steps,
      createManually:true
    });

    let dietsDB = await Diet.findAll({
        where: { name: diets}
    })

    recipeCreated.addDiet(dietsDB)
    return res.send('Recipe created successfully')
})

module.exports = router;
