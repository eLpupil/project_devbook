import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (msg, alertType, timeout = 3000) => {
    const id = uuidv4();

    return (dispatch) => {
        dispatch({
            type: SET_ALERT,
            payload: { msg, alertType, id }
        });
        setTimeout(() => {
           dispatch({
               type: REMOVE_ALERT,
               payload: { id: id }
           })
        }, timeout);
    }
};

