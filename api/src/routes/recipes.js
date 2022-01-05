
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
            const recipeCreated= await Recipe.create({            // estas tienen que estar definidas
             title,
             summary, 
             score,
             image,
             healthy_score, 
             steps,
             createInDb:false
           });
           recipeCreated.addDiet(diets)
        }
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
    // console.log(name);
    // await getApiInfo()
    // let recipesTotal = await getAllRecipes();
    let recipesTotal = await getDbInfo();
    
    if (name) {
        let recipeName = await recipesTotal.filter (item => item.title.toLowerCase()
        .includes(name.toLowerCase()))
        recipeName.length?
        res.status(200).send(recipeName):
        res.status(404).send('Recipe title doesnt exist in the DataBase!');
    }else {
        res.status(200).send(recipesTotal);
    }
} )


router.get('/:id', async function(req, res, next){
    console.log("entreee");
    const {id} = req.params
    console.log(id);
    const allData = await getDbInfo();
    if (id) {
        var foundId = await allData.filter(item => item.id== id)
    }
    console.log("foundid:",foundId);
    foundId.length?
    res.status(200).json(foundId):
    res.status(404).send('There is no recipe with that id')
})

module.exports = router;