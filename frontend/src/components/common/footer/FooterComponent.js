import React, {Component} from 'react';
import {Row,Col} from 'reactstrap';
import { Link } from "react-router-dom"
import { ReactComponent as FBIcon } from '../../../assets/images/FBIcon.svg';
import { ReactComponent as TwitterIcon } from '../../../assets/images/TwitterIcon.svg';
import { ReactComponent as PinterestIcon } from '../../../assets/images/PinterestIcon.svg';
import { ReactComponent as InstaIcon } from '../../../assets/images/InstaIcon.svg';

class Footer extends Component {
	render() {
		return(
			<Row className={'footer-main section-content border-bottom'}>
        <Link to='/'>Contact Us </Link> @ 4087999641<br/>
        <p className="copyright">Copyright: © 2019 Test. All rights reserved. Patent pending.</p>
        {/* <Col xs='2' className='links'>
          <Link to='/'>About</Link>
          <Link to='/'>Press</Link>
          <Link to='/'>Investors Relations</Link>
        </Col>
        <Col xs='2' className='links'>
          <Link to='/'>Blogs</Link>
          <Link to='/'>Jobs</Link>
          <Link to='/'>Agent Referrals</Link>
        </Col>
        <Col xs='2' className='links'>
          <Link to='/'>Contact Us</Link>
          <Link to='/'>Help</Link>
          <Link to='/'>Mobile</Link>
        </Col>
        <Col xs='2' className=''>
          <div className='icons mb-3'>
            <Link to='/' className='facebook'>
              <FBIcon />
            </Link>
            <Link to='/' className='twitter'>
              <TwitterIcon />
            </Link>
            <Link to='/' className='pin'>
              <PinterestIcon />
            </Link>
            <Link to='/' className='insta'>
              <InstaIcon />
            </Link>
          </div>
          <div className='countries'>
            <p style={{ fontSize: '14px' }}>Countries</p>
            <p className="country" >
              <Link to='/'>
                <img className="flag" src="https://ssl.cdn-houzzleads.com/v289.3.0/images/footer/flags/united-states.png" alt="US flag" loading="lazy" />
                United States
              </Link>
            </p>
            <p className="country">
              <Link href="https://www.houzzleads.ca">
                <img className="flag" src="https://ssl.cdn-houzzleads.com/v289.3.0/images/footer/flags/canada.png" alt="Canadian flag" loading="lazy" />
                Canada
              </Link>
            </p>
          </div>
        </Col>
        <Col className='legal'>
          <p className="tos-eula">
            Updated January 2019: By searching, you agree to the{" "}
            <Link to="/">Terms of Use</Link>, and&nbsp;<Link to="/">Privacy Policy</Link>.</p>
          <p className="copyright">Copyright: © 2019 Test. All rights reserved. Patent pending.</p>
          <p className="trademark">houzzleads and all houzzleads variants, TITLE FORWARD, WALK SCORE, and the R logos, are trademarks of houzzleads Corporation, registered or pending in the USPTO.</p>
          <p className="eho">
            <Link className="icon ehoLogo" to="/" title="Equal Housing Opportunity">
              <svg className="SvgIcon equal-housing">
                <svg viewBox="0 0 24 24">
                  <path d="M8.157 16.553h7.715v-2H8.157v2zm10.849 3.64V8.83l-6.982-4.522-6.976 4.516v9.114l.013 2.256h13.945zm2.008 2.001H3.024v-12.16H1v-.97L12.024 2l11.024 7.064v.97H21.03l-.016 12.16zM8.157 12.551h7.715v-2H8.157v2z" fillRule="evenodd"></path>
                </svg>
              </svg>
            </Link>{" "}
            <span>California BRE #01521930</span>
          </p>
          <p className="trec">TREC:{" "}
            <Link to="'/">Info About Brokerage Services</Link>, <Link to="/">Consumer Protection Notice</Link>
          </p>
          <p className="helpReading">If you are using a screen reader, or having trouble reading this website, please call houzzleads Customer Support for help at
            <Link className="phoneNumber" to="tel:*******">**********</Link>.</p>
        </Col> */}
      </Row>
		)
	}
}

export default Footer;