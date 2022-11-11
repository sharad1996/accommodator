import React, { useState } from 'react';
import { Container, NavItem, Nav, NavLink, Col, Row, Spinner } from 'reactstrap';
import './card.scss';

const SubCards = props => {
  const { userProduct, products } = props;
  const finalProduct = typeof userProduct !== 'undefined' ? finalProduct : 1;
  const [selectedProduct, setSelectProduct] = useState(finalProduct);
  const toggle = (pid,amount) => {
    setSelectProduct(pid);
    props.setSelectedProduct(pid,amount);
  };
  return (
    <Container>
      <Row>
        <Nav tabs className='w-100  text-center px-0 my-3'>
          {products.length > 0 ? (
            products.map(productData => {
              return (
                <Col key={productData.id}>
                  <NavItem
                    className={`nav-bck ${selectedProduct === productData.id ? 'active' : ''} `}
                    onClick={() => toggle(productData.id,productData.amount)}
                  >
                    <NavLink>
                      <div className='col-12 p-0 plan-title'>
                        <h5>{`${productData.product_plan.sub_plan}ly Subscription`}</h5>
                      </div>
                      <div className='plan-amount'>
                        <p>{productData.amount} $</p>
                        <p>{`per ${productData.product_plan.sub_plan}`}</p>
                      </div>
                      <hr />
                      <div className='col-12 p-0 plan-description'>
                        <p className='billed-section'>{productData.description}</p>
                      </div>
                      <button
                        className={`btn select-plan-btn ${selectedProduct === productData.id ? 'btn-active' : ''}`}
                      >
                        {selectedProduct === productData.id ? 'Selected plan' : 'Select plan'}
                      </button>
                    </NavLink>
                  </NavItem>
                </Col>
              );
            })
          ) : (
            <Col lg={12} className='d-flex justify-content-center'>
              <Spinner color='primary' />
            </Col>
          )}
        </Nav>
      </Row>
    </Container>
  );
};
export default SubCards;
