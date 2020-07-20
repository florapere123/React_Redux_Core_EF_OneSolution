import {
    UPDATE_ITEM_REQUEST,
    UPDATE_ITEM_SUCCESS,
    UPDATE_ITEM_FAILURE,
} from './updateItemTypes';

import  initialState  from '../initalStateForm';

 
const reducer = (state=initialState, action) => {
    switch (action.type) {
        case UPDATE_ITEM_REQUEST:
            return {
                ...state,
                loading: true,
                error:'',
                successMsg:''
            }
        case UPDATE_ITEM_SUCCESS:
            {
              
                return {
                    ...initialState,
                    loading: false,
                    error:'',
                    successMsg:'Updated successfuly ID' +action.payload.Id
                }
         
        }
        case UPDATE_ITEM_FAILURE:
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
