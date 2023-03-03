require('dotenv').config();
const BASE_URL = process.env.REACT_APP_API;

console.log('BASE_URL', BASE_URL);
export const URL_GET_ALL_RECIPES = `${BASE_URL}/recipes`;
export const URL_GET_RECIPES_HOME = `${BASE_URL}/`;
export const URL_GET_TYPES = `${BASE_URL}/types`;
export const URL_POST_RECIPE = `${BASE_URL}/recipe`;
export const URL_GET_RECIPE_QUERY = `${BASE_URL}/recipes?name=`;
export const URL_SEARCH_BY_RECIPE_ID = `${BASE_URL}/recipes/`;
export const URL_GET_RECIPE_BY_ORDER = `${BASE_URL}/filter?order=`;


