
import axios from 'axios';
import { types } from './types';

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


export function loadDataToDb(){

    return async function(dispatch){
        await axios.get('http://localhost:3001/',{});
        // console.log(json.data);
        return dispatch({
            type: types.LOAD_DATA
        })
    }
    
}

export function filterRecipesByDiets(payload){
    console.log('payload of filter recipes',payload);
    return {
            type: types.FILTER_RECIPES_BY_DIETS,
            payload
        }
}

    