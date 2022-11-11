import React, { Component } from 'react';
import { connect } from 'react-redux';
import LandingPageComponent from '../components/landingPage/LandingPageComponent';
import { userLoginAction } from '../store/AuthStore/UserLoginStore';
import { userRegisterAction } from '../store/AuthStore/UserRegisterStore';
import { mapSearchAction } from '../store/LeadsStore/MapStore';
import { zipCodeAction } from '../store/LeadsStore/ZipCode';

class LandingPageContainer extends Component {
  render() {
    const { mapSearchReducer, mapSearchAction, zipCodeAction, zipCodeReducer } = this.props;
    return (
      <LandingPageComponent
        mapSearchReducer={mapSearchReducer}
        mapSearchAction={mapSearchAction}
        zipCodeAction={zipCodeAction}
        zipCodeReducer={zipCodeReducer}
      />
    );
  }
}

const mapStateToProps = ({ authReducer, mapReducer }) => {
  const { userRegisterReducer, userLoginReducer } = authReducer;
  const { mapSearchReducer, zipCodeReducer } = mapReducer;
  return {
    userRegisterReducer,
    userLoginReducer,
    mapSearchReducer,
    zipCodeReducer,
  };
};

const mapDispatchToProps = () => {
  return {
    userRegisterAction,
    userLoginAction,
    mapSearchAction,
    zipCodeAction,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(LandingPageContainer);
