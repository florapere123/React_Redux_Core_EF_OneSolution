import {
    ALERT_CLEAR,
    ALERT_SUCCESS,
    ALERT_ERROR
} from './alertTypes'
 

 
 

const reducer = (state={} , action) => {
    switch (action.type) {
        case ALERT_SUCCESS:
          return {
            type: 'alert-success',
            message: action.message
          };
        case ALERT_ERROR:
          return {
            type: 'alert-danger',
            message: action.message
          };
        case ALERT_CLEAR:
          return {};
        default:
          return state
      }
}

export default reducer
