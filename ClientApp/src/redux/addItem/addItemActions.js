import axios from 'axios'
import {
    ADD_ITEM_REQUEST,
    ADD_ITEM_SUCCESS,
    ADD_ITEM_FAILURE,
} from './addItemTypes'
import { appConfig } from '../../Config';
import { addCurrentUserItem } from '../itemList/itemListActions';
import { alertActions } from '../alertActions/alertActions';
 
export const addItem = (item) => {
    return (dispatch) => {
        dispatch(addItemRequest())
        axios
            .post(appConfig.API_URL , item, {
               // headers: { 'Content-Type': 'multipart/form-data' },
               headers: { 'Accept': '*/*'}
            })
            .then((response) => {
               const currentItem = response.data;
                dispatch(addItemSuccess(currentItem));
                dispatch(addCurrentUserItem(currentItem));
                dispatch(alertActions.success('Added Succesfully for Id :'+currentItem.Id));
            })
            .catch((error) => {
                // error.message is the error message
                dispatch(addItemFailure(error.message))
                dispatch(alertActions.error(error.message));
            })
    }
}

export const addItemRequest = () => {
    return {
        type: ADD_ITEM_REQUEST,
    }
}

export const addItemSuccess = (item) => {
    return {
        type: ADD_ITEM_SUCCESS,
        payload: item,
    }
}

export const addItemFailure = (error) => {
    return {
        type: ADD_ITEM_FAILURE,
        payload: error,
    }
}
