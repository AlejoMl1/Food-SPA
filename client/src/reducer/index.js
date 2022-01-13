import {types} from '../actions/types';

const initialState = {
    recipes : [],
    allRecipes:[]
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
        console.log('llegue a reducer filter by order');
            return {
                ...state,
                recipes : action.payload
            }

        case types.LOAD_DATA :
            return{
                ...state
            }
        case types.FILTER_RECIPES_BY_DIETS:
            const allRecipes = state.allRecipes
            let filteredDiets=[]
            if( action.payload === "All") {
                 filteredDiets= state.allRecipes.slice(0)
            }else{
                //filter the elements that contains the diets
                for (const el of allRecipes) {
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
       
               
        default:
        return state;
    }

}
export default reducer ;