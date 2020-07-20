import axios from 'axios'
import {
    FETCH_ITEMS_REQUEST,
    FETCH_ITEMS_SUCCESS,
    FETCH_ITEMS_FAILURE,
    ADD_CURRENT_USER_ITEM,
    UPDATE_CURRENT_USER_ITEM,
    DELETE_CURRENT_USER_ITEM
} from './itemListTypes';

import { appConfig } from '../../Config';
 
export const fetchItems = () => {
    return (dispatch) => {
        dispatch(fetchItemsRequest())
      
        axios
            .get(appConfig.API_URL)
            .then((response) => {
                // response.data is the items
                const items = response.data
                dispatch(fetchItemsSuccess(items))
            })
            .catch((error) => {
                // error.message is the error message
                dispatch(fetchItemsFailure(error.message))
            })
    }
}

export const fetchItemsRequest = () => {
    return {
        type: FETCH_ITEMS_REQUEST,
    }
}

export const fetchItemsSuccess = (items) => {
    return {
        type: FETCH_ITEMS_SUCCESS,
        payload: items,
    }
}

export const fetchItemsFailure = (error) => {
    return {
        type: FETCH_ITEMS_FAILURE,
        payload: error,
    }
}
export const addCurrentUserItem = (newItem) => {
    return {
        type: ADD_CURRENT_USER_ITEM,
        payload: newItem,
    }
}
export const updateCurrentUserItem = (item) => {
    return {
        type: UPDATE_CURRENT_USER_ITEM,
        payload: item,
    }
}
export const deleteCurrentUserItem = (item) => {
    return {
        type: DELETE_CURRENT_USER_ITEM,
        payload: item
    }
}