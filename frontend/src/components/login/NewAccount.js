import { Formik } from 'formik';
import React from 'react';
import { connect } from 'react-redux';
import { Alert, Button, Col, Form, Input, NavLink, Row, Spinner } from 'reactstrap';
import MailIcon from '../../assets/images/email.png';
import NameIcon from '../../assets/images/name.png';
import PasswordIcon from '../../assets/images/password.jpg';
import { userRegisterAction } from '../../store/AuthStore/UserRegisterStore';
//import { COMMON_ERROR_MSG } from '../../utils/constants/APIConstants';
import InputField from '../common/inputField/inputField.js';

class NewAccount extends React.Component {
  renderAlertMessages() {
    const { fail, success, responseData, error } = this.props.userRegisterReducer;
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
  }

  render() {
    return (
      <Formik
        initialValues={{ firstName: '', lastName: '', email: '', password: '', confirmPassword: '', terms: false }}
        validate={values => {
          console.log(values);
          const errors = {};
          if (!values.firstName) {
            errors.firstName = 'Please enter first name';
          } else if (!values.lastName) {
            errors.lastName = 'Please enter last name';
          } else if (!values.email) {
            errors.email = 'Please enter email address';
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
          } else if (!values.password) {
            errors.password = 'Please enter password';
          } else if ((values.password && values.password.length < 6) || values.password.length > 20) {
            errors.password = 'Password length should be between 6 to 20 character';
          } else if (values.confirmPassword !== values.password) {
            errors.confirmPassword = 'Confirm password and password does not match';
          } else if (!values.terms) {
            console.log('kkkkkaaaaaaaaaa');
            errors.terms = 'Please check terms and condition box';
          }
          return errors;
        }}
        onSubmit={values => {
          this.props.userRegisterAction(values);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            {this.renderAlertMessages()}
            <Row className='pb-3'>
              <Col>
                <InputField
                  placeholder='First name'
                  content={NameIcon}
                  type='text'
                  name='firstName'
                  onChange={handleChange}
                  value={values.firstName}
                />
                <span className='text-danger d-inline-block w-100 text-right mt-1'>
                  {errors.firstName && touched.firstName && errors.firstName}
                </span>
              </Col>
              <Col>
                <InputField
                  placeholder='Last name'
                  content={NameIcon}
                  type='text'
                  name='lastName'
                  onChange={handleChange}
                  value={values.lastName}
                />
                <span className='text-danger d-inline-block w-100 text-right mt-1'>
                  {errors.lastName && touched.lastName && errors.lastName}
                </span>
              </Col>
            </Row>
            <Row className='pb-3'>
              <Col>
                <InputField
                  placeholder='Enter email'
                  content={MailIcon}
                  type='email'
                  name='email'
                  onChange={handleChange}
                  value={values.email}
                />
                <span className='text-danger d-inline-block w-100 text-right mt-1'>
                  {errors.email && touched.email && errors.email}
                </span>
              </Col>
            </Row>
            <Row className='pb-3'>
              <Col>
                <InputField
                  placeholder='Enter password'
                  content={PasswordIcon}
                  type='password'
                  name='password'
                  onChange={handleChange}
                  value={values.password}
                />
                <span className='text-danger d-inline-block w-100 text-right mt-1'>
                  {errors.password && touched.password && errors.password}
                </span>
              </Col>
            </Row>
            <Row className='pb-3'>
              <Col>
                <InputField
                  placeholder='Enter confirm password'
                  content={PasswordIcon}
                  type='password'
                  name='confirmPassword'
                  onChange={handleChange}
                  value={values.confirmPassword}
                />
                <span className='text-danger d-inline-block w-100 text-right mt-1'>
                  {errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}
                </span>
              </Col>
            </Row>
            <Row className=' pl-3 ml-3'>
              <Col>
                <Input type='checkbox' name='terms' onChange={handleChange} value='true' />
                <span style={{ color: 'grey' }}>Terms and conditions</span>
                <span className='text-danger d-inline-block w-100 text-left mt-1'>
                  {errors.terms && touched.terms && errors.terms}
                </span>
              </Col>
            </Row>

            <Row>
              <Col className='d-flex justify-content-center pt-2'>
                {this.props.userRegisterReducer.loading ? (
                  <Spinner color='primary' />
                ) : (
                  <Button color='primary' type='submit' onClick={() => this.props.submitData()}>
                    Submit
                  </Button>
                )}
              </Col>
            </Row>
            <Row>
              <Col className='d-flex justify-content-center'>
                <NavLink onClick={() => this.props.showPages(false)} className='d-flex justify-content-center'>
                  <span style={{ color: 'grey' }}>Already have an account?&nbsp;</span>
                  Login
                </NavLink>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    );
  }

  componentWillUnmount() {
    this.props.userRegisterAction({ reset: true });
  }
}

const mapStateToProps = ({ authReducer }) => {
  const { userRegisterReducer } = authReducer;
  return {
    userRegisterReducer,
  };
};

const mapDispatchToProps = () => {
  return {
    userRegisterAction,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(NewAccount);
