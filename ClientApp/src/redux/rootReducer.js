import { combineReducers } from 'redux'
import itemListReducer from './itemList/itemListReducer'
import addItemReducer from './addItem/addItemReducer'
import updateItemReducer from './updateItem/updateItemReducer'
import deleteItemReducer from './deleteItem/deleteItemReducer'
import  alertReducer from './alertActions/alertReducer'

const rootReducer = combineReducers({ 
    addItem: addItemReducer,
    updateItem: updateItemReducer,
    deleteItem: deleteItemReducer,
    itemList: itemListReducer,
    alertManager:alertReducer
})

export default rootReducer
