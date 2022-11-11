import React from 'react';
import { connect } from 'react-redux';
import SubPage from '../components/subscriptionPage/SubscriptionPage';
import { paymentAction } from '../store/PaymentStore/CheckoutStore';
import { productAction } from '../store/PlanStore/ProductStore';
import { payDetailAction } from '../store/PaymentStore/GetPaymentDetail';
class SubscriptionPlanContainer extends React.Component {
  render() {
    const {
      paymentAction,
      paymentReducer,
      productAction,
      productReducer,
      payDetailAction,
      payDetailReducer,
    } = this.props;
    return (
      <div>
        <SubPage
          paymentReducer={paymentReducer}
          paymentAction={paymentAction}
          productAction={productAction}
          productsReducer={productReducer}
          payDetailAction={payDetailAction}
          payDetailReducer={payDetailReducer}
        />
      </div>
    );
  }
}
const mapStateToProps = ({ payReducer, planReducer }) => {
  const { paymentReducer } = payReducer;
  const { productReducer } = planReducer;
  const { payDetailReducer } = payReducer;
  return {
    paymentReducer,
    productReducer,
    payDetailReducer
  };
};

const mapDispatchToProps = () => {
  return {
    productAction,
    paymentAction,
    payDetailAction
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(SubscriptionPlanContainer);
