import React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import logo from '../../../assets/images/hlogo.jpg';
import RenderAccount from '../../login/RenderAccounts.js';

const NewModal = props => {
  const { isOpenLogin, openLoginModal } = props;
  // const responseGoogle = response => {
  //   console.log(response);
  // };

  const { success, responseData } = props.userLoginReducer;
  if (success && !responseData.error && isOpenLogin) {
    openLoginModal();
  }

  return (
    <div>
      <Modal isOpen={isOpenLogin} toggle={openLoginModal}>
        <ModalHeader toggle={props.openLoginModal} cssModule={{ 'modal-title': 'w-100 text-center' }}>
          {typeof props.title !== 'undefined' && props.title !== '' ? (
            <p>{props.title}</p>
          ) : (
            <div className='d-flex justify-content-center'>
              <img src={logo} height={'50px'} alt={'logo'} />
              <div className='pt-1'>
                <h2>HouzzLeads</h2>
              </div>
            </div>
          )}
        </ModalHeader>
        <ModalBody>
          {typeof props.page !== 'undefined' && (props.page === 'login' || props.page === 'signUp') && (
            <div>
              <RenderAccount page={props.page} toggleModel={props.openLoginModal} />
            </div>
          )}
          {/* <LoginTabs /> */}
        </ModalBody>
        {/*
        <ModalFooter className="d-flex justify-content-end">
          <GoogleLogin
            clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
            buttonText="Continue with google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          /> 

        <span style={{ color: 'grey' }}><p>Not registered?create account</p></span>

        <PrimaryButton title="Sign up" />

        </ModalFooter>

      */}
      </Modal>
    </div>
  );
};

const mapStateToProps = ({ authReducer }) => {
  const { userLoginReducer } = authReducer;
  return {
    userLoginReducer,
  };
};

export default connect(mapStateToProps, {})(NewModal);
