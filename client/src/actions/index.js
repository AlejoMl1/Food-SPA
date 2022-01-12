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

export function loadDataToDb(){

    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/',{});
        // console.log(json.data);
        return dispatch({
            type: types.LOAD_DATA
        })
    }
    
}