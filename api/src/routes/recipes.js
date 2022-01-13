
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


router.get('/',async (req,res,next) =>{
    // if /recipes?name='blabla'
    const name = req.query.name;
    // console.log(name);
    // await getApiInfo()
    // let recipesTotal = await getAllRecipes();
    let recipesTotal = await getDbInfo();
    //if there is nothing in the db it means the user skip the / route and the data must be fetch to create the db and show the recipesTotal
    if (!recipesTotal.length){   
        // console.log('entre a recipes a crear db');
        let url= 'https://api.spoonacular.com/recipes/complexSearch?'
        let maxNumber = 100;
        let link= url +'apiKey='+API_KEY+'&number='+maxNumber+'&addRecipeInformation=true';
        await createDietsDb(link)
        await createRecipeDb(link)   
    }

    if (name ) {
        let recipeName = await recipesTotal.filter (item => item.title.toLowerCase()
        .includes(name.toLowerCase()))
        recipeName.length?
        res.status(200).send(recipeName):
        res.status(404).send('Recipe title doesnt exist in the DataBase!');
    }else {
        let recipesTotal = await getDbInfo();
        res.status(200).send(recipesTotal);
    }
} )


router.get('/:id', async function(req, res, next){
    console.log("entre en ruta id");
    const {id} = req.params
    console.log('id: ' , id);
    const allData = await getDbInfo();
    if (id && allData.length) {
        var foundId = await allData.filter(item => item.id== id)
    }
    console.log("foundid:",foundId);
    foundId.length?
    res.status(200).json(foundId):
    res.status(404).send('There is no recipe with that id')
})

module.exports = router;