import React, { Component } from 'react';
import { connect } from 'react-redux';
import ActivateAccount from '../components/login/ActivateAccount';
import { sendUserActivationAction } from '../store/AuthStore/SendUserActivationStore';
import { userActivationAction } from '../store/AuthStore/UserActivationStore';

class ActivateAccountContainer extends Component {
  render() {
    return (
      <ActivateAccount
        userActivationAction={this.props.userActivationAction}
        userActivationReducer={this.props.userActivationReducer}
        sendUserActivationAction={this.props.sendUserActivationAction}
        sendUserActivationReducer={this.props.sendUserActivationReducer}
      />
    );
  }
}

const mapStateToProps = ({ authReducer }) => {
  const { userActivationReducer, sendUserActivationReducer } = authReducer;
  return {
    userActivationReducer,
    sendUserActivationReducer,
  };
};

const mapDispatchToProps = () => {
  return {
    userActivationAction,
    sendUserActivationAction,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(ActivateAccountContainer);
