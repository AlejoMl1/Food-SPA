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
const createDietsDb = async(link)=>{
  const typesDietsApi = await axios.get(link);
  //this will return an array of arrays
  const arrayDiets = typesDietsApi.data.results.map(item => item.diets)
  //add the vegetarian Diet
  let vegetarian = ['vegetarian']
  arrayDiets.push(vegetarian);
  //every item of every array has to be checked, if the diet is new please created it in 
  //the database otherwise keep looking 
  // console.log(arrayDiets);
  arrayDiets.map(item => {
    for (const dietName of item) {
        Diet.findOrCreate({
        where: {name:dietName}
      })
    }
  })
}

router.get('/', async function(req, res, next){

    const allDiets = await Diet.findAll();
    //if there is no diet in the db 
    if (!allDiets.length){
      console.log('no hubieron dietas');
      let url= 'https://api.spoonacular.com/recipes/complexSearch?'
      let maxNumber = 100;
      let link= url +'apiKey='+API_KEY+'&number='+maxNumber+'&addRecipeInformation=true';
      await createDietsDb(link)
      const allDiets = await Diet.findAll();
      res.send(allDiets);
    }else{
      res.send(allDiets);
    }
})

router.post('/nueva', async function(req, res, next){

  const dietss = req.body.name
  console.log('acaaaa',dietss)
  if(dietss){
    let x = await Diet.create({
      name:dietss
    })
    res.status('200').send('Nueva diet')
  }else{
    res.status('400').send('no se pudo crear la nueva dieta')
  }
 
})

module.exports = router;
