import { Formik } from 'formik';
import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Alert, Button, Col, Form, FormGroup, Input, NavLink, Row, Spinner } from 'reactstrap';
import MailIcon from '../../assets/images/email.png';
import PasswordIcon from '../../assets/images/password.jpg';
import { sendForgotPasswordAction } from '../../store/AuthStore/SendForgotPasswordStore';
import { userLoginAction } from '../../store/AuthStore/UserLoginStore';
//import { COMMON_ERROR_MSG } from '../../utils/constants/APIConstants';
import InputField from '../common/inputField/inputField.js';
import './Login.scss';

class Login extends React.Component {
  state = {
    currentFrom: 'login',
  };

  handleCurrentForm = formName => {
    this.setState({
      currentFrom: formName,
    });
  };

  renderForgotPasswordFrom = () => {
    const { fail, success, responseData,error } = this.props.sendForgotPasswordReducer;

    if (success) {
      if (responseData.error) {
        return (
          <Alert color='danger' fade={false}>
            {responseData.message}
          </Alert>
        );
      }

      return (
        <Alert color='success' fade={false}>
          {responseData.message}
        </Alert>
      );
    }

    if (fail) {
      return (
        <Alert color='danger' fade={false}>
          {error.message}
        </Alert>
      );
    }
  };

  forgotPasswordFrom = () => {
    return (
      <Formik
        initialValues={{ email: '' }}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Please enter email address';
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={values => {
          this.props.sendForgotPasswordAction(values);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            {this.renderForgotPasswordFrom()}
            <FormGroup row>
              <Col>
                <InputField
                  content={MailIcon}
                  id='example-3'
                  placeholder='Enter email'
                  type='email'
                  onChange={handleChange}
                  value={values.email}
                  name='email'
                />
                <span className='text-danger d-inline-block w-100 text-right mt-1'>
                  {errors.email && touched.email && errors.email}
                </span>
              </Col>
            </FormGroup>
            <Row>
              <Col className='d-flex justify-content-end'>
                <Button
                  color='link'
                  onClick={() => {
                    this.handleCurrentForm('login');
                    this.props.sendForgotPasswordAction({ reset: true });
                  }}
                >
                  Back to Login
                </Button>
              </Col>
            </Row>
            <Row>
              <Col className='d-flex justify-content-center'>
                {this.props.sendForgotPasswordReducer.loading ? (
                  <Spinner color='primary' />
                ) : (
                  <Button type='submit' color='primary'>
                    Send Reset Link
                  </Button>
                )}
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    );
  };

  // resetPasswordFrom = () => {
  //   return (
  //     <Formik
  //       initialValues={{ password: '', confirmPassword: '' }}
  //       validate={values => {
  //         const errors = {};
  //         if (!values.password) {
  //           errors.password = 'Please enter password';
  //         } else if (values.confirmPassword !== values.password) {
  //           errors.confirmPassword = 'Confirm Password does not match with Password';
  //         }
  //         return errors;
  //       }}
  //       onSubmit={(values, { setSubmitting }) => {
  //         setTimeout(() => {
  //           alert(JSON.stringify(values, null, 2));
  //           setSubmitting(false);
  //         }, 400);
  //       }}
  //     >
  //       {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
  //         <Form onSubmit={handleSubmit}>
  //           <FormGroup row>
  //             <Col xs='12'>
  //               <InputField
  //                 content={PasswordIcon}
  //                 placeholder='Enter Password'
  //                 type='password'
  //                 onChange={handleChange}
  //                 value={values.password}
  //                 name='password'
  //               />
  //               <span className='text-danger d-inline-block w-100 text-right mt-1'>
  //                 {errors.password && touched.password && errors.password}
  //               </span>
  //             </Col>
  //             <Col xs='12'>
  //               <InputField
  //                 content={PasswordIcon}
  //                 placeholder='Enter Confirm Password'
  //                 type='password'
  //                 onChange={handleChange}
  //                 value={values.confirmPassword}
  //                 name='confirmPassword'
  //               />
  //               <span className='text-danger d-inline-block w-100 text-right mt-1'>
  //                 {errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}
  //               </span>
  //             </Col>
  //           </FormGroup>
  //           {/* <Row>
  //             <Col className='d-flex justify-content-end'>
  //               <Button
  //                 color='link'
  //                 onClick={() => {
  //                   this.handleCurrentForm('login');
  //                 }}
  //               >
  //                 Back to Login
  //               </Button>
  //             </Col>
  //           </Row> */}
  //           <Row>
  //             <Col className='d-flex justify-content-center'>
  //               <div className=''>
  //                 <Button type='submit' color='primary'>
  //                   Submit
  //                 </Button>
  //               </div>
  //             </Col>
  //           </Row>
  //         </Form>
  //       )}
  //     </Formik>
  //   );
  // };

  // resendActivationFrom = () => {
  //   return (
  //     <Formik
  //       initialValues={{ email: '' }}
  //       validate={values => {
  //         const errors = {};
  //         if (!values.email) {
  //           errors.email = 'Please enter email address';
  //         } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
  //           errors.email = 'Invalid email address';
  //         }
  //         return errors;
  //       }}
  //       onSubmit={(values, { setSubmitting }) => {
  //         setTimeout(() => {
  //           alert(JSON.stringify(values, null, 2));
  //           setSubmitting(false);
  //         }, 400);
  //       }}
  //     >
  //       {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
  //         <Form onSubmit={handleSubmit}>
  //           <FormGroup row>
  //             <Col>
  //               <InputField
  //                 content={MailIcon}
  //                 placeholder='Enter email'
  //                 type='email'
  //                 onChange={handleChange}
  //                 value={values.email}
  //                 name='email'
  //               />
  //               <span className='text-danger d-inline-block w-100 text-right mt-1'>
  //                 {errors.email && touched.email && errors.email}
  //               </span>
  //             </Col>
  //           </FormGroup>
  //           <Row>
  //             <Col className='d-flex justify-content-end'>
  //               <Button
  //                 color='link'
  //                 onClick={() => {
  //                   this.handleCurrentForm('login');
  //                 }}
  //               >
  //                 Back to Login
  //               </Button>
  //             </Col>
  //           </Row>
  //           <Row>
  //             <Col className='d-flex justify-content-center'>
  //               <Button type='submit' color='primary'>
  //                 Send Activation Link
  //               </Button>
  //             </Col>
  //           </Row>
  //         </Form>
  //       )}
  //     </Formik>
  //   );
  // };

  renderLoginAlertMessages() {
    const { fail, success, responseData,error } = this.props.userLoginReducer;
    if (success) {
      if (responseData.error) {
        return (
          <Alert color='danger' fade={false}>
            {responseData.message}
          </Alert>
        );
      }
    }

    if (fail) {
      return (
        <Alert color='danger' fade={false}>
          {error.message}
        </Alert>
      );
    }
  }

  loginFrom = () => (
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Please enter email address';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
        } else if (!values.password) {
          errors.password = 'Please enter password';
        }
        return errors;
      }}
      onSubmit={values => {
        this.props.userLoginAction(values, this.props.history);
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          {this.renderLoginAlertMessages()}
          <Row className=' mt-4 pb-3'>
            <Col>
              <InputField
                content={MailIcon}
                placeholder='Enter email'
                type='email'
                onChange={handleChange}
                value={values.email}
                name='email'
              />
              {errors.email && touched.email && (
                <span className='text-danger w-100 d-inline-block text-right mt-1'>{errors.email}</span>
              )}
            </Col>
          </Row>
          <Row className='pb-4'>
            <Col>
              <InputField
                content={PasswordIcon}
                placeholder='Enter password'
                type='password'
                onChange={handleChange}
                value={values.password}
                name='password'
              />
              {errors.password && touched.password && (
                <span className='text-danger w-100 d-inline-block text-right mt-1'>{errors.password}</span>
              )}
            </Col>
          </Row>
          <Row>
            <Col className='d-flex justify-content-end'>
              <Button
                color='link'
                onClick={() => {
                  this.handleCurrentForm('forgot-password');
                }}
              >
                Forget password?
              </Button>
            </Col>
          </Row>
          <Row>
            <Col className='d-flex justify-content-center'>
              {this.props.userLoginReducer.loading ? (
                <Spinner color='primary' />
              ) : (
                <Button type='submit' color='primary'>
                  Login
                </Button>
              )}
            </Col>
          </Row>
          <Row>
            <Col className='d-flex  justify-content-center' xs='12'>
              <NavLink onClick={() => this.props.showPages(true)}>
                <span style={{ color: 'grey' }}>Don't have an account?&nbsp;</span>
                Sign up
              </NavLink>
            </Col>
            <Col className='d-flex  justify-content-center' xs='12'>
              <Link
                className='nav-link'
                onClick={e => {
                  e.preventDefault();
                  this.props.toggleModel();
                  this.props.history.push('activate-account');
                }}
              >
                <span style={{ color: 'grey' }}>Account activate?&nbsp;</span>
                Activation
              </Link>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );

  render() {
    return (
      <div className='sign_in_container'>
        {this.state.currentFrom === 'login' && this.loginFrom()}
        {this.state.currentFrom === 'forgot-password' && this.forgotPasswordFrom()}
      </div>
    );
  }

  // componentDidUpdate() {
  //   const { success, responseData } = this.props.userLoginReducer;
  //   if (success && !responseData.error) {
  //     this.props.toggleModel();
  //   }
  // }
}

const mapStateToProps = ({ authReducer }) => {
  const { userLoginReducer, sendForgotPasswordReducer } = authReducer;
  return {
    userLoginReducer,
    sendForgotPasswordReducer,
  };
};

const mapDispatchToProps = () => {
  return {
    userLoginAction,
    sendForgotPasswordAction,
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps())(Login));
