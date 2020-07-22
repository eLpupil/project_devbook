import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteAccount } from '../../actions/profile';

function DeleteAccount(props) {

    function handleClick() {
        props.deleteAccount();
    }

    return (
        <div className="my-2">
            <button className="btn btn-danger" onClick={handleClick}>
                <i className="fas fa-user-minus"></i>Delete My Account
            </button>
        </div>
    )
}

DeleteAccount.propTypes = {
    deleteAccount: PropTypes.func.isRequired
}

export default connect(null, { deleteAccount })(DeleteAccount);