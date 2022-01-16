import {types} from '../actions/types';

const initialState = {
    recipes : [],
    allRecipes:[],
    types:[]
}


function reducer(state=initialState, action){
    switch(action.type){
        case types.GET_RECIPES :
             return{
                 ...state,
                 recipes: action.payload,
                 allRecipes: action.payload
             }
        case types.FILTER_RECIPES_BY_ORDER:
        // console.log('llegue a reducer filter by order');
            return {
                ...state,
                recipes : action.payload
            }
        case types.FILTER_ASC_DESC:
                let sortedRecipes = action.payload === 'ASC'?
                state.recipes.sort((next, prev) => {
                    if (next.title >prev.title){
                        return 1;
                    }else if (next.title <prev.title){
                        return -1;
                    }else{
                        return 0;
                    }
                }):
                state.recipes.sort((next, prev) => {
                    if (next.title >prev.title){

                        return -1;
                    }else if (next.title <prev.title){
                        return 1;
                    }else{
                        return 0;
                    }
                })
                // console.log('sortedRecipes:', sortedRecipes);
                return {
                    ...state,
                    recipes : sortedRecipes
                }


        case types.LOAD_DATA :
            return{
                ...state
            }
        case types.FILTER_RECIPES_BY_DIETS:
            var actualRecipes = state.recipes.slice(0)
            // console.log('actualRecipes', actualRecipes);
            // console.log('state.recipes', state.recipes);

            let filteredDiets=[]
            if( action.payload === "All") {
                 filteredDiets= state.allRecipes.slice(0)
            }else{
                //filter the elements that contains the diets
                for (const el of actualRecipes) {
                    for (const diets of el.diets) {
                        if (diets.name === action.payload){
                            filteredDiets.push(el)
                        }
                    }
                }
            }
            return {
                ...state,
                recipes : filteredDiets
            }
        case types.FILTER_RECIPES_BY_SOURCE:   
            let filteredDietss =[]
            if( action.payload === "All") {
                filteredDietss= state.allRecipes.slice(0)
            }else if (action.payload === "api") {
                filteredDietss = state.recipes.filter(element => 
                    element.createManually ===false)
            }else{
                filteredDietss = state.recipes.filter(element => 
                    element.createManually ===true)
            }
            console.log('filteredDietss',filteredDietss);
            return {
                ...state,
                recipes : filteredDietss
            }
        case types.GET_TYPES:
            return {
                ...state,
                types : action.payload
            }
        case types.POST_RECIPE:
            return {
                ...state,
            }
        case types.SEARCH_TITLE:
            return {
                ...state,
                recipes : action.payload
            }
        


        default:
        return state;
    }

}
export default reducer ;