import axios from 'axios'
import {
    UPDATE_ITEM_REQUEST,
    UPDATE_ITEM_SUCCESS,
    UPDATE_ITEM_FAILURE,
} from './updateItemTypes'
import { appConfig } from '../../Config';
import { updateCurrentUserItem } from '../itemList/itemListActions';
import { alertActions } from '../alertActions/alertActions';
 
export const updateItem = (item) => {
    return (dispatch) => {
        dispatch(updateItemRequest());
       
        axios
            .put(appConfig.API_URL , item, {
               // headers: { 'Content-Type': 'multipart/form-data' },
               headers: { 'Accept': '*/*'}
            })
            .then((response) => {
               const currentItem = response.data;
                dispatch(updateItemSuccess(currentItem));
                dispatch(updateCurrentUserItem(currentItem));
                //dispatch(alertActions.message('Updated Succesfully for Id :'+currentItem.Id));
                dispatch(alertActions.success('Updated Succesfully for Id :'+currentItem.Id));
            })
            .catch((error) => {
                // error.message is the error message
                dispatch(updateItemFailure(error.message))
                dispatch(alertActions.error(error.message));
            })
    }
}

export const updateItemRequest = () => {
    return {
        type: UPDATE_ITEM_REQUEST,
    }
}

export const updateItemSuccess = (item) => {
    return {
        type: UPDATE_ITEM_SUCCESS,
        payload: item,
    }
}

export const updateItemFailure = (error) => {
    return {
        type: UPDATE_ITEM_FAILURE,
        payload: error,
    }
}
