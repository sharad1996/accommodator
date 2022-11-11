import React, { Component } from 'react';
import ResetPassword from '../components/login/ResetPassword';
import { resetPasswordAction } from '../store/AuthStore/ResetPasswordStore';
import { connect } from 'react-redux';

class ResetPasswordContainer extends Component {
  render() {
    return (
      <ResetPassword
        resetPasswordAction={this.props.resetPasswordAction}
        resetPasswordReducer={this.props.resetPasswordReducer}
      />
    );
  }
}

const mapStateToProps = ({ authReducer }) => {
  const { resetPasswordReducer } = authReducer;
  return {
    resetPasswordReducer,
  };
};

const mapDispatchToProps = () => {
  return {
    resetPasswordAction,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(ResetPasswordContainer);
