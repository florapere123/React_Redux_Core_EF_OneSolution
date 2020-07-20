import {
    ADD_ITEM_REQUEST,
    ADD_ITEM_SUCCESS,
    ADD_ITEM_FAILURE,
} from './addItemTypes';

import  initialState  from '../initalStateForm';
 
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM_REQUEST:
            return {
                ...state,
                loading: true,
                error:'',
                successMsg:''
            }
        case ADD_ITEM_SUCCESS:
            return {
                ...initialState,
                loading: false,
                error:'',
                successMsg:'Added successfuly ID' +action.payload.Id
            }
            
            
        case ADD_ITEM_FAILURE:
            {
                return {
                    ...initialState,
                    loading: false,
                    error:action.payload,
                    successMsg:''
                }
            
        }
        default:
            return state
    }
}

export default reducer
