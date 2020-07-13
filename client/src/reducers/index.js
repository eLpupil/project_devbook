import alerts from './alerts';
import auth from './auth';

function rootReducer(state = {}, action) {
    return {
        alerts: alerts(state.alerts, action),
        auth: auth(state.auth, action)
    }
}

export default rootReducer;