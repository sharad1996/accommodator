import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import VideoScreenShot from '../../assets/images/ScreenShot.jpg';
import './landingPage.scss';
import PlanPage from '../../pages/plan';
import LandingPageFooterComponent from './LandingPageFooterComponent';
import SearchComponent from './SearchComponent';
import { withRouter } from 'react-router-dom';

class Index extends Component {
  componentDidMount() {
    this.props.zipCodeAction();
  }

  render() {
    const { mapSearchReducer, mapSearchAction, history, zipCodeReducer } = this.props;
    return (
      <>
        <div className='w-100' style={{ paddingTop: '400px' }}>
          <Row className='landing-page-bg p-5'>
            <Col sm={12} md={12} lg={{ size: 6, order: 2, offset: 2 }} className='m-auto'>
              <h1 className='text-white brand-text'>
                We leverge the best-in-class ML and Deep learning frameworks to generate leads for realtors.
              </h1>
              <SearchComponent
                mapSearchReducer={mapSearchReducer}
                mapSearchAction={mapSearchAction}
                history={history}
                zipCodeReducer={zipCodeReducer}
              />
            </Col>
          </Row>
          <div className='pb-4 ml-5 pl-5' style={{ zIndex: -1 }}>
            <PlanPage />
          </div>
          <Row>
            <Col xs='12' className=''>
              {/* <LandingPageCarouselComponent /> */}
            </Col>
          </Row>
          <Row className='section-content border-bottom'>
            <Col xs='12' className='service-story'>
              <div className='content'>
                <h1 className='title'>Full-Service Agents, Modern Technology</h1>
                <div className='d-flex justify-content-center'>
                  <p className='font-copy'>
                    We're full-service, local agents who get to know you over coffee and on home tours, and we use
                    online tools to make you smarter and faster.
                  </p>
                </div>
                {/* <div> */}
                <Link to='/' className='anchor-btn'>
                  See Out Story
                </Link>
                {/* </div> */}
              </div>
            </Col>
          </Row>
        </div>
        <LandingPageFooterComponent className='section-content border-bottom' zipCodeReducer={zipCodeReducer} />
      </>
    );
  }
}

export default withRouter(Index);
