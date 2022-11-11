import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import Header from '../header';
import './layout.scss';
import Footer from '../footer/FooterComponent';

class Index extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className=''>
        <Container fluid className='layout-main'>
          <Header />
          {children}
          <Footer />
        </Container>
      </div>
    );
  }
}

export default withRouter(Index);
