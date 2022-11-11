import React, { Component } from 'react';
import Login from './Login';
import NewAccount from './NewAccount';

class RenderAccount extends Component {
  state = {
    hideLogin: typeof this.props.page !== 'undefined' && this.props.page === 'login' ? false : true,
  };

  handleLogin = status => {
    this.setState({
      hideLogin: status,
    });
  };

  submitData = () => {};
  render() {
    return (
      <div>
        {this.state.hideLogin === true && <NewAccount showPages={this.handleLogin} submitData={this.submitData} />}
        {this.state.hideLogin === false && (
          <Login showPages={this.handleLogin} submitData={this.submitData} toggleModel={this.props.toggleModel} />
        )}
      </div>
    );
  }
}

export default RenderAccount;
