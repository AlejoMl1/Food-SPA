const { Router } = require('express');
const recipes = require('./recipes.js');
const recipe = require('./recipe.js');
const types = require('./types.js');
const filterOrder = require('./filterOrder')
const axios = require('axios');
const {Recipe,Diet} = require('../db')
require('dotenv').config();

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const {
    API_KEY, 
    API_KEY2
  } = process.env;


router.use('/recipes', recipes);
router.use('/types', types);
router.use('/recipe', recipe);
router.use('/DESC', filterOrder);


const getDbInfo = async()=>{
    return await Recipe.findAll(
        {
        include:{
            model : Diet,
            attributes:['name']
        },
        through: {attributes: []}
    })
    }

//I will consume the api at the /route and create the database
const createRecipeDb= async(link)=>{
    try {
        //check if the info is already loaded 
        //if it is already in the db , dont replicate the data
        let dbInfo = await getDbInfo();
        // console.log('dbInfo',dbInfo);
        //if the db is empty
        if (dbInfo.length===0) {
            // console.log('el link fue:',link);
            const apiUrl= await axios.get(link)
            const apiInfo = await  apiUrl.data.results.map( element =>  {
                // console.log(element.analyzedInstructions);
                // console.log('elelemnto=',element.analyzedInstructions[0]);
                return{
                    id: element.id,
                    title: element.title,
                    summary: element.summary,
                    score: element.spoonacularScore,
                    healthy_score: element.healthScore,
                    image: element.image,
                    diets: element.diets,
                    steps: ((element.analyzedInstructions[0] && element.analyzedInstructions[0].steps)?
                    element.analyzedInstructions[0].steps.map(item=>{
                            // console.log('item:',item.step)
                            return (item.step)
                        }).join('|')
                        :'')
                }
            }
            )
            for( let data of apiInfo ) {
                let {title, summary, score,image ,healthy_score , steps, diets} = data;
                const recipeCreated= await Recipe.create({  
                    title,      
                    summary, 
                    score,
                    image,
                    healthy_score, 
                    steps,
                    createManually:false
                }
            //     include: [{
            //         recipe_diet: diets,
            //     }]}
            //     );
               
            )
            recipeCreated.addDiet(diets)
        }

    }
       
    } catch (error) {
        console.log('error in loadRecipes!')
        console.error(error.message);
    }

}
const createDietsDb = async(link)=>{
    const typesDietsApi = await axios.get(link);
    //this will return an array of arrays
    const arrayDiets = typesDietsApi.data.results.map(item => item.diets)
    //add the vegetarian Diet
    arrayDiets.push(['vegetarian'])
    //every item of every array has to be checked, if the diet is new please created it in 
    //the database otherwise keep looking 
    // console.log(arrayDiets);
    arrayDiets.map(item => {
        item.forEach(dietName => {
            Diet.findOrCreate({
                where: {name:dietName}
            })
            
        }
    )
    
})
}


router.get('/', async function(req, res, next){
    try{
        let url= 'https://api.spoonacular.com/recipes/complexSearch?'
        let maxNumber = 100;
        let link= url +'apiKey='+API_KEY+'&number='+maxNumber+'&addRecipeInformation=true';
        //request the diets to the API and create the DB of diets
        await createDietsDb(link)
        //fecth the recipe information and create the db of recipes
        await createRecipeDb(link)
        res.send('Welcome to the home route, DB Recipe and Diet created successfully');

    }catch(error){
        console.log('error in main route!')
        console.error(error.message);
    }
  })

module.exports = router;
