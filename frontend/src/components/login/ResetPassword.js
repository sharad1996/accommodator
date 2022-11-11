import { Formik } from 'formik';
import queryString from 'query-string';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Alert, Button, Col, Container, Form, FormGroup, Row, Spinner } from 'reactstrap';
import PasswordIcon from '../../assets/images/password.jpg';
import { COMMON_ERROR_MSG } from '../../utils/constants/APIConstants';
import InputField from '../common/inputField/inputField.js';

class ResetPassword extends Component {
  state = {
    key: '',
  };

  constructor(props) {
    super(props);
    const parsedHash = queryString.parse(this.props.location.hash);
    let { key } = parsedHash;
    this.state.key = key;
  }

  renderAlertMessages() {
    const { fail, success, responseData } = this.props.resetPasswordReducer;

    if (this.state.passwordMatchError) {
      return (
        <Alert color='danger' fade={false}>
          Password and Confirm Password does not match!
        </Alert>
      );
    }

    if (success) {
      if (responseData.error) {
        return (
          <Alert color='danger' fade={false}>
            Your reset link expired or it's malformed!
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
          {COMMON_ERROR_MSG.unexpected}
        </Alert>
      );
    }
  }

  render() {
    const { loading } = this.props.resetPasswordReducer;

    return (
      <Container fluid className='mb-5'>
        <Row>
          <Col lg='4' md='2' sm='1' />
          <Col>
            <div className='text-center mb-4'>
              <h5>Reset Password</h5>
            </div>
            {this.renderAlertMessages()}
            <Formik
              initialValues={{ password: '', confirmPassword: '' }}
              validate={values => {
                const errors = {};
                if (!values.password) {
                  errors.password = 'Please enter password';
                } else if ((values.password && values.password.length < 6) || values.password.length > 20) {
                  errors.password = 'Password length should be between 6 to 20 character';
                } else if (values.confirmPassword !== values.password) {
                  errors.confirmPassword = 'Confirm Password does not match with Password';
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                this.props.resetPasswordAction({ password: values.password, key: this.state.key });
              }}
            >
              {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                <Form onSubmit={handleSubmit}>
                  <FormGroup row>
                    <Col xs='12'>
                      <InputField
                        content={PasswordIcon}
                        placeholder='Enter Password'
                        type='password'
                        onChange={handleChange}
                        value={values.password}
                        name='password'
                      />
                      <span className='text-danger d-inline-block w-100 text-right mt-1'>
                        {errors.password && touched.password && errors.password}
                      </span>
                    </Col>
                    <Col xs='12'>
                      <InputField
                        content={PasswordIcon}
                        placeholder='Enter Confirm Password'
                        type='password'
                        onChange={handleChange}
                        value={values.confirmPassword}
                        name='confirmPassword'
                      />
                      <span className='text-danger d-inline-block w-100 text-right mt-1'>
                        {errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}
                      </span>
                    </Col>
                  </FormGroup>
                  <Row>
                    <Col className='d-flex justify-content-center'>
                      {loading ? (
                        <Spinner color='primary' />
                      ) : (
                        <Button type='submit' color='primary'>
                          Submit
                        </Button>
                      )}
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          </Col>
          <Col lg='4' md='2' sm='1' />
        </Row>
      </Container>
    );
  }

  componentWillUnmount() {
    this.props.resetPasswordAction({ reset: true });
  }
}

export default withRouter(ResetPassword);
