import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function DeleteAccount(props) {

    function handleClick() {
        
    }

    return (
        <div class="my-2">
            <button class="btn btn-danger" onClick={handleClick}>
                <i class="fas fa-user-minus"></i>

                Delete My Account
            </button>
        </div>
    )
}

DeleteAccount.propTypes = {
    deleteAccount: PropTypes.func.isRequired
}

export default connect()(DeleteAccount);