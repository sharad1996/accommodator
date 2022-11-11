import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import PrimaryButton from '../common/button/primaryButton';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentErr:false
    };
  }

  submit = async () => {
    try {
      this.props.setTokenGenerationState(true);
      this.setState({
        paymentErr:false
      });
      const { token } = await this.props.stripe.createToken();
      if (typeof token.id !== 'undefined') {
        const paymentObject = { stripe_token: token.id, product_id: this.props.productId };
        this.props.paymentAction(paymentObject);
      }
      this.props.setTokenGenerationState(false);

    } catch(err) {
      this.props.setTokenGenerationState(false)
      this.setState({
        paymentErr:true
      });
    }
  }


  render() {
    let disabledButton = false;
    const { productId, paymentReducer,showPaymentAlert,tokenGeneration } = this.props;
    if (
      tokenGeneration === true ||
      typeof productId === 'undefined' ||
      productId === '' ||
      paymentReducer.loading === true
    ) {
      disabledButton = true;
    }
    return (
      <div className='checkout p-2'>
        <p> Would you like to complete the purchase ? </p>
        <CardElement />
        <div className='py-3'>
          <PrimaryButton onClick={this.submit} disabled={disabledButton} title='Purchase' />
        </div>
        {showPaymentAlert()}
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
