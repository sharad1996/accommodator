import React from 'react';
//import VideoScreenShot from '../../assets/images/ScreenShot.jpg';
import { Col, Row } from 'reactstrap';
import './card.scss';
import mailicon from '../../assets/images/email.png';
import phoneicon from '../../assets/images/phone.png';
import nameicon from '../../assets/images/name.png';
import addressicon from '../../assets/images/address.png';

class AppartmentDetails extends React.Component {
  render() {
    return (
      <Col lg={6} className=' p-2 mb-2'>
        <div className='d-flex flex-column card_details p-3 m-2'>
          <Row>
            <Col >
              <img height={'15px'} src={nameicon} alt={'name'} /> &nbsp;{this.props.name}
            </Col>
            <Col lg={12}>
              <img height={'15px'} src={phoneicon} alt={'phone'} /> {this.props.phn}
            </Col>
            <Col lg={12}>
              <img height={'15px'} src={mailicon} alt={'mail'} /> &nbsp;{this.props.email}
            </Col>
            <Col lg={12}>
              <img height={'15px'} src={addressicon} alt={'address'} /> &nbsp;
              <span style={{ fontSize: '1.2rem' }}>{this.props.address}</span>
            </Col>
          </Row>
        </div>
      </Col>
    );
  }
}
export default AppartmentDetails;
// <div>
//   <img style={{ borderRadius: 0 }} top width='100%' height={'280px'} src={VideoScreenShot} alt='Video' />
// </div>
