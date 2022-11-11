import { Formik } from 'formik';
import React from 'react';
import { Alert, Button, Col, Form, Row, Spinner } from 'reactstrap';
import { COMMON_ERROR_MSG } from '../../utils/constants/APIConstants.js';
import InputField from '../common/inputField/inputField.js';
import PrimaryButton from '../common/button/primaryButton.js';

class ProfileSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: false,
    };
  }
  getFormInitialValues = () => {
    const { userData } = this.props;
    let initialValues = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      address: '',
      password: '',
      dob: '',
      confirmPassword: '',
    };

    const { success, responseData } = this.props.getUserReducer;
    if (success && !responseData.error) {
      initialValues = { ...initialValues, ...responseData.data };
    }
    return initialValues;
  };

  renderAlertMessages() {
    if (this.props.updateUserReducer.success) {
      const { responseData } = this.props.updateUserReducer;
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

    if (this.props.getUserReducer.fail && this.props.updateUserReducer.fail) {
      return (
        <Alert color='danger' fade={false}>
          {COMMON_ERROR_MSG.unexpected}
        </Alert>
      );
    }
  }

  render() {
    const { loading } = this.props.getUserReducer;
    const { password } = this.state;
    return (
      <>
        {loading ? (
          <div className='text-center mb-1 mt-1'>
            <Spinner color='primary' />
          </div>
        ) : (
          <Formik
            initialValues={this.getFormInitialValues()}
            validate={values => {
              const errors = {};
              if (!values.firstName) {
                errors.firstName = 'Please enter first name';
              } else if (!values.email) {
                errors.email = 'Please enter email address';
              } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
              } else if (values.phoneNumber && !Number.isInteger(parseInt(values.phoneNumber))) {
                errors.phoneNumber = 'Must be number only';
              } else if (
                !errors.phoneNumber &&
                values.phoneNumber &&
                (values.phoneNumber.length < 9 || values.phoneNumber.length > 9)
              ) {
                errors.phoneNumber = 'Must be 10 digit';
              } else if (values.password && (values.password.length < 6 || values.password.length > 20)) {
                errors.password = 'Password length should be between 6 to 20 character';
              } else if (values.confirmPassword !== values.password) {
                errors.confirmPassword = 'Confirm password and password does not match';
              }
              return errors;
            }}
            onSubmit={values => {
              this.props.updateUserAction(values);
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                <div>
                  {this.renderAlertMessages()}
                  <Row>
                    <Col>
                      <div className='pb-3 '>
                        <span className='title_color'>First Name</span>
                        <div className='border'>
                          <InputField type='text' onChange={handleChange} value={values.firstName} name='firstName' />
                          {errors.firstName && touched.firstName && (
                            <span className='text-danger w-100 d-inline-block text-right mt-1'>{errors.firstName}</span>
                          )}
                        </div>
                      </div>
                      <div className='pb-3'>
                        <span className='title_color'>Email</span>
                        <div className='border'>
                          <InputField type='email' onChange={handleChange} value={values.email} name='email' />
                          {errors.email && touched.email && (
                            <span className='text-danger w-100 d-inline-block text-right mt-1'>{errors.email}</span>
                          )}
                        </div>
                      </div>

                      <div className='pb-3'>
                        <span className='title_color'>Birthday</span>
                        <div className='border'>
                          <InputField type='date' onChange={handleChange} value={values.dob} name='dob' />
                          {errors.dob && touched.dob && (
                            <span className='text-danger w-100 d-inline-block text-right mt-1'>{errors.dob}</span>
                          )}
                        </div>
                      </div>
                      <div style={{ display: password ? 'block' : 'none' }} className='py-5'>
                        <span className='title_color'>Password</span>
                        <div className='border'>
                          <InputField type='password' onChange={handleChange} value={values.password} name='password' />
                          {errors.password && touched.password && (
                            <span className='text-danger w-100 d-inline-block text-right mt-1'>{errors.password}</span>
                          )}
                        </div>
                      </div>
                    </Col>
                    <Col>
                      <div className='pb-3'>
                        <span className='title_color'>Last Name</span>
                        <div className='border'>
                          <InputField type='text' onChange={handleChange} value={values.lastName} name='lastName' />
                          {errors.lastName && touched.lastName && (
                            <span className='text-danger w-100 d-inline-block text-right mt-1'>{errors.lastName}</span>
                          )}
                        </div>
                      </div>
                      <div className='pb-3'>
                        <span className='title_color'>Phone</span>
                        <div className='border'>
                          <InputField
                            type='text'
                            onChange={handleChange}
                            value={values.phoneNumber}
                            name='phoneNumber'
                          />
                          {errors.phoneNumber && touched.phoneNumber && (
                            <span className='text-danger w-100 d-inline-block text-right mt-1'>
                              {errors.phoneNumber}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className='pb-3'>
                        <span className='title_color'>Address</span>
                        <div className='border'>
                          <InputField type='text' onChange={handleChange} value={values.address} name='address' />
                          {errors.address && touched.address && (
                            <span className='text-danger w-100 d-inline-block text-right mt-1'>{errors.address}</span>
                          )}
                        </div>
                      </div>
                      <div style={{ display: password ? 'block' : 'none' }} className='py-5'>
                        <span className='title_color'>Confirm Password</span>
                        <div className='border'>
                          <InputField
                            type='password'
                            onChange={handleChange}
                            value={values.confirmPassword}
                            name='confirmPassword'
                          />
                          {errors.confirmPassword && touched.confirmPassword && (
                            <span className='text-danger w-100 d-inline-block text-right mt-1'>
                              {errors.confirmPassword}
                            </span>
                          )}
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <div className='d-flex justify-content-end p-3 '>
                    {this.props.updateUserReducer.loading ? (
                      <Spinner color='primary' />
                    ) : (
                      <Button color='primary' type='submit'>
                        Update
                      </Button>
                    )}
                  </div>
                  <PrimaryButton title='change password' onClick={() => this.setState({ password: !password })} />
                </div>
              </Form>
            )}
          </Formik>
        )}
      </>
    );
  }
}
export default ProfileSetting;
