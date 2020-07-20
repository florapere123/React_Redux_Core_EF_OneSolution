import {
    FETCH_ITEMS_REQUEST,
    FETCH_ITEMS_SUCCESS,
    FETCH_ITEMS_FAILURE,
    ADD_CURRENT_USER_ITEM,
    UPDATE_CURRENT_USER_ITEM,
    DELETE_CURRENT_USER_ITEM
} from './itemListTypes'

const initialState = {
    loading: false,
    items: [],
    error: '',
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ITEMS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case FETCH_ITEMS_SUCCESS:
            return {
                loading: false,
                items: action.payload,
                error: '',
            }
        case FETCH_ITEMS_FAILURE:
            return {
                loading: false,
                items: [],
                error: action.payload,
            }
        case ADD_CURRENT_USER_ITEM:
            return {
                items: [...state.items, action.payload],
                loading: false,
                error: '',
            }
        case UPDATE_CURRENT_USER_ITEM:
            return {
                items: state.items.map((item) => {
                    if(item.Id === action.payload.Id){
                       return {
                          ...item,
                          ...action.payload
                       }
                    }
                    else {
                        return item;
                     } 
                 }),
                loading: false,
                error: '',
        }
        case DELETE_CURRENT_USER_ITEM:
            return {
                items:  state.items.filter((item) => item.Id !== action.payload.DeletedId),// [...state.items, action.payload],
                loading: false,
                error: '',
        }
        default:
            return state
    }
}

export default reducer
