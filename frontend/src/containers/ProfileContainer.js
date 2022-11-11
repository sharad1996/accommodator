import React from 'react';
import { connect } from 'react-redux';
import ProfileLayout from '../components/profile/ProfileLayout.js';
import { getUserAction } from '../store/UserStore/GetUserStore';
import { updateUserAction } from '../store/UserStore/UpdateUserStore';
import { subscriptionAction } from '../store/PlanStore/SubscriptionStore';

const ProfileContainer = props => {
  return (
    <ProfileLayout
      getUserReducer={props.getUserReducer}
      getUserAction={props.getUserAction}
      updateUserReducer={props.updateUserReducer}
      updateUserAction={props.updateUserAction}
      subscriptionAction={props.subscriptionAction}
      subscriptionReducer={props.subscriptionReducer}
    />
  );
};

const mapStateToProps = ({ userReducer, planReducer }) => {
  const { getUserReducer, updateUserReducer } = userReducer;
  const { subscriptionReducer } = planReducer;
  return {
    getUserReducer,
    updateUserReducer,
    subscriptionReducer,
  };
};

const mapDispatchToProps = () => {
  return {
    getUserAction,
    updateUserAction,
    subscriptionAction,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(ProfileContainer);
