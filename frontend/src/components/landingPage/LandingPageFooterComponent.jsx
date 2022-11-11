import React from 'react';
import { Row, Col, Label } from "reactstrap"
import { Link } from "react-router-dom"
import './LandingPageFooterComponent.scss';
import _ from 'lodash';

const LandingPageFooterComponent = (props) => {
  const {zipCodeReducer} = props
  const zipCodeData = _.has(zipCodeReducer,['responseData','data']) && zipCodeReducer.responseData.data.length >0 ?zipCodeReducer.responseData.data:[]
  return (
    <>
      <Row className={`footer-search ${props.className}`}>
        <Col xs='12' className='search-by-city'>
          <Row>
            {/* <Col xs='12'>
              <Label for="show-cities" className='city-visibility-toggle clickable'>Leads in</Label>
            </Col> */}
            <Col className='city-list'>
              {/* <Row className='mb-1'>
                { zipCodeData.length > 0 && zipCodeData.map(data => {
                  return (
                    <Col lg={2}>
                      <Link to={{pathname: "/map-search", state: {zipcode:data.zipcode }}} className='city'>{`leads in ${data.zipcode}`}</Link>
                    </Col>
                  );
                })}
              </Row> */}
              {/* <Row>
                <Col>
                  <Link to='/' className='city'>Show More ...</Link>
                </Col>
              </Row> */}
            </Col>
          </Row>
        </Col>
        <Col xs='12' className='search-by-state'>
          {/* <Row className='mt-5'>
            <Col xs='12'>
              <Label for="show-cities" className='city-visibility-toggle clickable'>Search for homes by State</Label>
              <Link to='/' className='city ml-2'>View Full list</Link>
            </Col>
            <Col className='city-list'>
              <Row className='mb-1'>
                <Col>
                  <Link to='/' className='city'>Albama</Link>
                  <span> . </span>
                  <Link to='/' className='city'>Homes for Sale</Link>
                </Col>
                <Col>
                  <Link to='/' className='city'>Albama</Link>
                  <span> . </span>
                  <Link to='/' className='city'>Homes for Sale</Link>
                </Col>
                <Col>
                  <Link to='/' className='city'>Albama</Link>
                  <span> . </span>
                  <Link to='/' className='city'>Homes for Sale</Link>
                </Col>
                <Col>
                  <Link to='/' className='city'>Albama</Link>
                  <span> . </span>
                  <Link to='/' className='city'>Homes for Sale</Link>
                </Col>
                <Col>
                  <Link to='/' className='city'>Albama</Link>
                  <span> . </span>
                  <Link to='/' className='city'>Homes for Sale</Link>
                </Col>
              </Row>
              <Row className='mb-1'>
                <Col>
                  <Link to='/' className='city'>Albama</Link>
                  <span> . </span>
                  <Link to='/' className='city'>Homes for Sale</Link>
                </Col>
                <Col>
                  <Link to='/' className='city'>Albama</Link>
                  <span> . </span>
                  <Link to='/' className='city'>Homes for Sale</Link>
                </Col>
                <Col>
                  <Link to='/' className='city'>Albama</Link>
                  <span> . </span>
                  <Link to='/' className='city'>Homes for Sale</Link>
                </Col>
                <Col>
                  <Link to='/' className='city'>Albama</Link>
                  <span> . </span>
                  <Link to='/' className='city'>Homes for Sale</Link>
                </Col>
                <Col>
                  <Link to='/' className='city'>Albama</Link>
                  <span> . </span>
                  <Link to='/' className='city'>Homes for Sale</Link>
                </Col>
              </Row>
              <Row className='mb-1'>
                <Col>
                  <Link to='/' className='city'>Albama</Link>
                  <span> . </span>
                  <Link to='/' className='city'>Homes for Sale</Link>
                </Col>
                <Col>
                  <Link to='/' className='city'>Albama</Link>
                  <span> . </span>
                  <Link to='/' className='city'>Homes for Sale</Link>
                </Col>
                <Col>
                  <Link to='/' className='city'>Albama</Link>
                  <span> . </span>
                  <Link to='/' className='city'>Homes for Sale</Link>
                </Col>
                <Col>
                  <Link to='/' className='city'>Albama</Link>
                  <span> . </span>
                  <Link to='/' className='city'>Homes for Sale</Link>
                </Col>
                <Col>
                  <Link to='/' className='city'>Albama</Link>
                  <span> . </span>
                  <Link to='/' className='city'>Homes for Sale</Link>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Link to='/' className='city'>Show More ...</Link>
                </Col>
              </Row>
            </Col>
          </Row> */}

        </Col>
      </Row>
    </>
  );
}

export default LandingPageFooterComponent;
