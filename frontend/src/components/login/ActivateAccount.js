import { Formik } from 'formik';
import queryString from 'query-string';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Alert, Button, Col, Container, Form, FormGroup, Row, Spinner } from 'reactstrap';
import MailIcon from '../../assets/images/email.png';
//import { COMMON_ERROR_MSG } from '../../utils/constants/APIConstants';
import InputField from '../common/inputField/inputField.js';

class ActivateAccount extends Component {
  state = {
    email: '',
    toSendEmail: false,
    withoutToken: true,
  };

  constructor(props) {
    super(props);
    const parsedHash = queryString.parse(this.props.location.hash);
    let { key } = parsedHash;
    this.props.userActivationAction({ reset: true });
    if (key) {
      this.props.userActivationAction({ key });
      this.state = {
        withoutToken: false,
      };
    }
  }

  renderAlertMessages() {
    const { userActivationReducer, sendUserActivationReducer } = this.props;

    if (userActivationReducer.success) {
      if (userActivationReducer.responseData.error) {
        return (
          <Alert color='danger' fade={false}>
            {userActivationReducer.responseData.message}
          </Alert>
        );
      }

      return (
        <Alert color='success' fade={false}>
          {userActivationReducer.responseData.message}
        </Alert>
      );
    }

    if (sendUserActivationReducer && sendUserActivationReducer.success) {
      if (sendUserActivationReducer.responseData.error) {
        return (
          <Alert color='danger' fade={false}>
            {sendUserActivationReducer.responseData.message}
          </Alert>
        );
      }

      return (
        <Alert color='success' fade={false}>
          {sendUserActivationReducer.responseData.message}
        </Alert>
      );
    }
    console.log('lla',this.props.sendUserActivationReducer,userActivationReducer);

    if (userActivationReducer.fail || (sendUserActivationReducer && sendUserActivationReducer.fail)) {
      const { error } = this.props.sendUserActivationReducer;
      let msg = error !== null ?error.message:'Invalid token';
      return (
        <Alert color='danger' fade={false}>
          {msg}
        </Alert>
      );
    }
  }

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.validator.allValid()) {
      this.props.userActivationAction({ reset: true });
      this.setState({
        toSendEmail: true,
      });
      this.props.sendUserActivationAction({ email: this.state.email });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  render() {
    const { userActivationReducer, sendUserActivationReducer } = this.props;
    return (
      <Container fluid className='mb-5'>
        <Row>
          <Col lg='4' md='2' sm='1' />
          <Col>
            {userActivationReducer.loading ? (
              <div className='text-center mb-1 mt-1'>
                <Spinner color='primary' />
              </div>
            ) : (
              <>
                <div className='text-center mb-4'>
                  <h5>Account Activation</h5>
                </div>
                <div>{this.renderAlertMessages()}</div>
                {(this.state.withoutToken ||
                  this.state.toSendEmail ||
                  userActivationReducer.fail ||
                  (userActivationReducer.success && userActivationReducer.responseData.error)) && (
                  <>
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
                        this.props.userActivationAction({ reset: true });
                        this.setState({
                          toSendEmail: true,
                        });
                        this.props.sendUserActivationAction({ email: values.email });
                      }}
                    >
                      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                        <Form onSubmit={handleSubmit}>
                          <FormGroup row>
                            <Col>
                              <InputField
                                content={MailIcon}
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
                            <Col className='d-flex justify-content-center'>
                              {sendUserActivationReducer && sendUserActivationReducer.loading ? (
                                <Spinner color='primary' />
                              ) : (
                                <Button type='submit' color='primary'>
                                  Send Activation Link
                                </Button>
                              )}
                            </Col>
                          </Row>
                        </Form>
                      )}
                    </Formik>
                  </>
                )}
              </>
            )}
          </Col>
          <Col lg='4' md='2' sm='1' />
        </Row>
      </Container>
    );
  }
}

export default withRouter(ActivateAccount);
