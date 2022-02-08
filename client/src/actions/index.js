
import axios from 'axios';
import { types } from './types';
import {URL_GET_ALL_RECIPES,
    URL_GET_RECIPES_HOME,
    URL_GET_TYPES,
    URL_POST_RECIPE,
    URL_GET_RECIPE_QUERY,
    URL_SEARCH_BY_RECIPE_ID,
    URL_GET_RECIPE_BY_ORDER
 } from '../assets/constants'



export function filterByASC_DESC(payload){
    // console.log('payload of filter recipes',payload);
    return {
            type: types.FILTER_ASC_DESC,
            payload
        }
}

export function filterByOrder(payload){

    return async function(dispatch){
        var recipesByOrder = await axios.get(
            URL_GET_RECIPE_BY_ORDER+ payload,{});

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
//payload is the id
export function getDetail(payload){
    return async function(dispatch){
        var json = await axios.get(URL_SEARCH_BY_RECIPE_ID+payload,{});

        console.log('json in getdetail=',json.data);
        return dispatch(  {
                type: types.GET_DETAIL,
                payload: json.data
            })
    }
}


export function getRecipes(){

    return async function(dispatch){
        var json = await axios.get( URL_GET_ALL_RECIPES ,{});
        // console.log(json.data);
        return dispatch({
            type: types.GET_RECIPES,
            payload: json.data
        })
    }
}

export function getTypes(){
    return async function(dispatch){
        var typesArray = await axios.get( URL_GET_TYPES,{});

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
        await axios.get(URL_GET_RECIPES_HOME,{});
        // console.log(json.data);
        return dispatch({
            type: types.LOAD_DATA
        })
    }
    
}

export function postRecipe(payload){
    return async function(dispatch){
        var newRecipe = await axios.post(URL_POST_RECIPE,payload);
        console.log('newRecipe en postRecipe',newRecipe);
    
        return newRecipe
    }
}


export function searchTitle(payload){ 

    return async function(dispatch){

        if (payload.length <2){
            console.log('search title payload empty',payload);
            var titleData = await axios.get(URL_GET_ALL_RECIPES,{});
        }else{
            console.log('search title payload',payload);
            var titleData = await axios.get(URL_GET_RECIPE_QUERY+payload,{});
            // console.log(json.data);
        }
        return dispatch({
            type: types.SEARCH_TITLE,
            payload: titleData.data
        })
        } 
}
