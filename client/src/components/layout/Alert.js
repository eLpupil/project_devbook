import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function Alert(props) {
    return (
        props.alerts.map(alert => {
            return <div key={alert.id} className={`alert alert-${alert.alertType}`}>{alert.msg}</div>
        })
    )
}

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
}

function mapStateToProps(state){
    return { alerts: state.alerts };
}

export default connect(mapStateToProps)(Alert);