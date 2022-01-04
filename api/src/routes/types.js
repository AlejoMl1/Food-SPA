const { Router } = require('express');
const { Diet } = require('../db');
const axios = require('axios');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {
    API_KEY, 
    API_KEY2
  } = process.env;

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', async function(req, res, next){
    let url= 'https://api.spoonacular.com/recipes/complexSearch?'
    let maxNumber = 100;
    let link= url +'apiKey='+API_KEY2+'&number='+maxNumber+'&addRecipeInformation=true';
    const typesDietsApi = await axios.get(link);
    //this will return an array of arrays
    const arrayDiets = typesDietsApi.data.results.map(item => item.diets)
    //every item of every array has to be checked, if the diet is new please created it in 
    //the database otherwise keep looking 
    arrayDiets.map(item => {
        item.forEach(dietName => {
            Diet.findOrCreate({
                where: {name:dietName}
            })
        }
    )
    
})
const allDiets = await Diet.findAll();
res.send(allDiets);
})

module.exports = router;
