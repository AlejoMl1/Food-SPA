import {types} from '../actions/types';

const initialState = {
    recipes : []
}


function reducer(state=initialState, action){
    switch(action.type){
        case types.GET_RECIPES :
             return{
                 ...state,
                 recipes: action.payload
             }
        case types.LOAD_DATA :
        return{
            ...state
          
        }
    default:
        return state;
    }

}
export default reducer ;