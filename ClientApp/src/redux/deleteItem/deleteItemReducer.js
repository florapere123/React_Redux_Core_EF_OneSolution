import {
    DELETE_ITEM_REQUEST,
    DELETE_ITEM_SUCCESS,
    DELETE_ITEM_FAILURE
} from './deleteItemTypes'

import  initialState  from '../initalStateForm';

 
 

const reducer = (state=initialState , action) => {
    switch (action.type) {
        case DELETE_ITEM_REQUEST:
            return {
                ...state,
                loading: true,
                error:'',
                successMsg:''
            }
        case DELETE_ITEM_SUCCESS:
              
            return {
                ...initialState,
                loading: false,
                error:'',
                successMsg:'Deleted successfuly ID' +action.payload.DeletedId
            }
            
        case DELETE_ITEM_FAILURE:
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
