
import axios from 'axios';
import { types } from './types';


export function filterByASC_DESC(payload){
    // console.log('payload of filter recipes',payload);
    return {
            type: types.FILTER_ASC_DESC,
            payload
        }
}

export function filterByOrder(payload){

    return async function(dispatch){
        var recipesByOrder = await axios.get(`http://localhost:3001/filter?order=${payload}`,{});

        // console.log('payload of filter order',typeof(payload));
        // console.log(recipesByOrder.data);
        return dispatch(  {
                type: types.FILTER_RECIPES_BY_ORDER,
                payload: recipesByOrder.data
            })
    }
}

export function filterRecipesByDiets(payload){
    // console.log('payload of filter recipes',payload);
    return {
            type: types.FILTER_RECIPES_BY_DIETS,
            payload
        }
}

export function filterRecipesBySource(payload){
    // console.log('payload of filter recipes',payload);
    return {
            type: types.FILTER_RECIPES_BY_SOURCE,
            payload
        }
}


export function getRecipes(){

    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/recipes',{});
        // console.log(json.data);
        return dispatch({
            type: types.GET_RECIPES,
            payload: json.data
        })
    }
}

export function getTypes(){
    return async function(dispatch){
        var typesArray = await axios.get('http://localhost:3001/types',{});

        // console.log('payload of filter order',typeof(payload));
        // console.log(recipesByOrder.data);
        return dispatch(  {
                type: types.GET_TYPES,
                payload: typesArray.data
            })
    }
}


export function loadDataToDb(){

    return async function(dispatch){
        await axios.get('http://localhost:3001/',{});
        // console.log(json.data);
        return dispatch({
            type: types.LOAD_DATA
        })
    }
    
}

export function postRecipe(payload){
    return async function(dispatch){
        var newRecipe = await axios.post('http://localhost:3001/recipe',payload);
        console.log('newRecipe en postRecipe',newRecipe);
    
        return newRecipe
    }
}


export function searchTitle(payload){ 

    return async function(dispatch){

        if (payload.length <2){
            console.log('search title payload empty',payload);
            var titleData = await axios.get('http://localhost:3001/recipes',{});
        }else{
            console.log('search title payload',payload);
            var titleData = await axios.get(`http://localhost:3001/recipes?name=${payload}`,{});
            // console.log(json.data);
        }
        return dispatch({
            type: types.SEARCH_TITLE,
            payload: titleData.data
        })
        } 
}
