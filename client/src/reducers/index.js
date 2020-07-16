import alerts from './alerts';
import auth from './auth';
import profile from './profile';

function rootReducer(state = {}, action) {
    return {
        alerts: alerts(state.alerts, action),
        auth: auth(state.auth, action),
        profile: profile(state.profile, action)
        
    }
}

export default rootReducer;