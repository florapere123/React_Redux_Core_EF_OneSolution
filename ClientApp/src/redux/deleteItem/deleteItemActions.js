import axios from 'axios'
import {
    DELETE_ITEM_REQUEST,
    DELETE_ITEM_SUCCESS,
    DELETE_ITEM_FAILURE
} from './deleteItemTypes'
import { appConfig } from '../../Config';
import { deleteCurrentUserItem } from '../itemList/itemListActions';
import { alertActions } from '../alertActions/alertActions';
 
export const deleteItem = (item) => {
    return (dispatch) => {
         let delUrl=appConfig.API_URL + item.Id;
        dispatch(deleteItemRequest())
        axios
            .delete(delUrl, {
                headers: { 'Accept': '*/*'}
            })
            .then((response) => {
               const currentItem = response.data;
                dispatch(deleteItemSuccess(currentItem));
                dispatch(deleteCurrentUserItem(currentItem));
                dispatch(alertActions.success('Deleted Succesfully for Id :'+currentItem.DeletedId));
             })
            .catch((error) => {
                // error.message is the error message
                dispatch(deleteItemFailure(error.message));
                dispatch(alertActions.error(error.message));
            })
    }
}

export const deleteItemRequest = () => {
    return {
        type: DELETE_ITEM_REQUEST,
    }
}

export const deleteItemSuccess = (item) => {
    return {
        type: DELETE_ITEM_SUCCESS,
        payload: item,
    }
}

export const deleteItemFailure = (error) => {
    return {
        type: DELETE_ITEM_FAILURE,
        payload: error,
    }
}
