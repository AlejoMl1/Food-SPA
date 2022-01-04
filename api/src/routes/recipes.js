
const {Recipe,Diet} = require('../db')
const { Router } = require('express');
const axios = require('axios');
require('dotenv').config();

// router.get('/', async function(req, res, next){
//     diets = await Diet.findAll()
//     return res.json(diets);
//   })

const {
    API_KEY, 
    API_KEY2
  } = process.env;

const router = Router();

const getApiInfo= async()=>{
    try {
        
        let url= 'https://api.spoonacular.com/recipes/complexSearch?'
        let maxNumber = 100;
        let link= url +'apiKey='+API_KEY2+'&number='+maxNumber+'&addRecipeInformation=true';
        console.log('el link fue:',link);
        const apiUrl= await axios.get(link)
        const apiInfo = await  apiUrl.data.results.map( element =>  {
            // console.log(element.analyzedInstructions);
            // console.log('elelemnto=',element.analyzedInstructions[0]);
            return{
                id: element.id,
                title: element.title,
                summary: element.summary,
                score: element.spoonacularScore,
                healthScore: element.healthScore,
                image: element.image,
                diets: element.diets,
                steps: ((element.analyzedInstructions[0] && element.analyzedInstructions[0].steps)?
                element.analyzedInstructions[0].steps.map(item=>{
                        // console.log('item:',item.step)
                        return (item.step) 
                    })
                    :'')
            }
        }
        )
        return apiInfo
    } catch (error) {
        console.log('error in getApiInfo!')

        console.error(error.message);
    }

}

const getDbInfo = async()=>{
    return await Recipe.findAll({
        include:{
            model : Diet,
            attributes:['name']
        },
        through: {attributes: []}
    })
}

const getAllRecipes = async()=>{
    let apiInfo = await getApiInfo();
    let dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo) ;
    return infoTotal;
}

router.get('/',async (req,res,next) =>{
    // if /recipes?name='blabla'
    const name = req.query.name;
    let recipesTotal = await getAllRecipes();
    
    if (name) {
        let recipeName = await recipesTotal.filter (item => item.name.toLowerCase()
        .includes(name.toLowerCase()))
        characterName.length?
        res.status(200).send(characterName):
        res.status(404).send('Not Found a recipe with that name')
    }else {
        res.status(200).send(recipesTotal);
    }
} )

module.exports = router;