import React from 'react';
import PlanCards from '../common/subscriptionCards/card.js';
import { Alert, Col } from 'reactstrap';
import _ from 'lodash';
import SubscriptionIcon from '../../assets/images/subscribe.png';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';
import './Sub.scss';
import { STRIPE_PUBLIC_KEY } from '../../utils/constants/CommonConstants';
import PrimaryButton from '../common/button/primaryButton.js';
import card from '../../assets/images/card.png';

class SubPage extends React.Component {
  constructor(props) {
    super(props);
    this.props.productAction(`product_detail_status=${1}`);
    this.state = {
      selectedProduct: 1,
      selectedAmount: 0,
      tokenGeneration: false,
    };
  }
  componentDidMount() {
    this.props.payDetailAction();
  }
  showAlert = () => {
    const { fail } = this.props.productsReducer;
    if (fail) {
      return <Alert color='danger'>Error in loading plans. Please retry again</Alert>;
    }
  };
  setProduct = (pid, amount) => {
    this.setState({ selectedProduct: pid, selectedAmount: amount });
  };

  handleClick = () => {
    this.props.paymentAction({ product_id: this.state.selectedProduct });
  };

  setTokenGenerationFlag = flag => {
    this.setState({
      tokenGeneration: flag,
    });
  };

  showPaymentAlert = () => {
    const { tokenGeneration, paymentErr } = this.state;
    const { paymentReducer } = this.props;
    if (tokenGeneration || paymentReducer.loading) {
      return <Alert color='info'>Payment in Process....</Alert>;
    }

    if (paymentReducer.success === true) {
      return <Alert color='success'>ThankYou for the Payment</Alert>;
    }
    if (paymentReducer.fail === true || paymentErr === true) {
      return <Alert color='danger'>Error in payment. Please retry again</Alert>;
    }
  };

  render() {
    const { productsReducer, payDetailReducer } = this.props;
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    const stripeCustomerId = userDetails && userDetails.stripe_customer_id;
    let cardLastDigit = '';
    if (_.has(payDetailReducer, ['responseData', 'data']) && payDetailReducer.responseData.data.length > 0) {
      cardLastDigit = payDetailReducer.responseData.data[0].last4;
    }
    return (
      <div className='p-5 '>
        <div className='d-flex justify-content-center p-3'>
          <img height={'50px'} src={SubscriptionIcon} alt={'sub'} />
          <h1>Simple Pricing</h1>
        </div>
        <PlanCards
          products={_.has(productsReducer, ['responseData', 'data']) ? productsReducer.responseData.data : []}
          setSelectedProduct={this.setProduct}
        />
        {this.state.selectedAmount > 0 ? (
          <div>
            {stripeCustomerId ? (
              <div className='p-3 mt-2  w-75 bg-light'>
                <h5>Would you like to complete the purchase?</h5>
                <div className='bg-light d-flex  w-50  shadow text-dark border p-1 m-3'>
                  <Col lg={2}>
                    <img height='30px' src={card} alt='card' />
                  </Col>

                  <Col>
                    <h4>
                      ****/****/****/<span style={{ color: 'grey' }}>{cardLastDigit}</span>
                    </h4>
                  </Col>
                </div>
                <PrimaryButton title='Purchase' onClick={this.handleClick} />
                {this.showPaymentAlert()}
              </div>
            ) : (
              <div className='w75 bg-light text-dark p-2'>
                <StripeProvider apiKey={STRIPE_PUBLIC_KEY}>
                  <div className='mt-3'>
                    <h1>Payment Options</h1>
                    <Elements>
                      <CheckoutForm
                        productId={this.state.selectedProduct}
                        paymentAction={this.props.paymentAction}
                        paymentReducer={this.props.paymentReducer}
                        showPaymentAlert={this.showPaymentAlert}
                        setTokenGenerationState={this.setTokenGenerationFlag}
                        tokenGeneration={this.state.tokenGeneration}
                      />
                    </Elements>
                  </div>
                </StripeProvider>
              </div>
            )}
          </div>
        ) : (
          <div className='mt-5'>
            <h1>Click to enjoy free trial</h1>
            <PrimaryButton title='Purchase' onClick={this.handleClick} />
            {this.showPaymentAlert()}
          </div>
        )}
      </div>
    );
  }
}
export default SubPage;
