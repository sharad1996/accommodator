import React from 'react';
import { Col, Container, NavLink, Row } from 'reactstrap';
import displaypic from '../../assets/images/displaypic.png';
import AboutUs from './AboutUs.js';
import PlanDescription from './PlanDescription.js';
import ProfileSetting from './ProfileSetting.js';
import '../profile/profile.scss';
import moment from 'moment';

class ProfileLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
    };
    this.props.subscriptionAction();
  }
  // componentDidMount() {
  //   this.props.subscriptionAction();
  // }
  showProfile(id) {
    this.setState({
      activeTab: id,
    });
  }

  render() {
    const { activeTab } = this.state;
    const profile = this.state.profile;
    const plans = this.state.plans;
    const aboutUs = this.state.aboutUs;
    const userData = JSON.parse(localStorage.getItem('userDetails'));
    return (
      <Container fluid className='p-5'>
        <Row>
          <Col lg={4} className='card_container border mt-4'>
            <div className='fields'>
              <Row>
                <Col>
                  <div className='image-upload'>
                    <label for='file-input'>
                      <img height={'150px'} src={displaypic} alt={''} />
                    </label>
                    <input id='file-input' type='file' />
                  </div>
                </Col>
                <Col className='pt-4'>
                  <div className='d-flex-column '>
                    <span>
                      <h3>{`${userData.firstName} ${userData.lastName}`}</h3>
                    </span>
                    <span style={{ color: 'grey' }}>
                      <p>Created: {moment(userData.createdAt).format('YYYY-MM-DD')}</p>
                    </span>
                  </div>
                </Col>
              </Row>
            </div>
            <div className=''>
              <NavLink
                onClick={() => this.showProfile('1')}
                className={activeTab === '1' ? 'border-bottom text-white bg-primary' : 'border-bottom'}
              >
                <span>Profile Setting</span>
              </NavLink>
              <NavLink
                onClick={() => this.showProfile('2')}
                className={activeTab === '2' ? 'border-bottom text-white bg-primary' : 'nav-bar  border-bottom'}
              >
                <span>Subscription</span>
              </NavLink>
              <NavLink
                onClick={() => this.showProfile('3')}
                className={activeTab === '3' ? 'navbar text-white bg-primary' : 'nav-bar'}
              >
                <span>About us</span>
              </NavLink>
            </div>
          </Col>
          <Col lg={8} className='field_container  p-5'>
            {activeTab === '1' ? (
              <ProfileSetting
                getUserReducer={this.props.getUserReducer}
                getUserAction={this.props.getUserAction}
                updateUserReducer={this.props.updateUserReducer}
                updateUserAction={this.props.updateUserAction}
                userData={userData}
              />
            ) : activeTab === '2' ? (
              <PlanDescription subscriptionReducer={this.props.subscriptionReducer} />
            ) : (
              activeTab === '3' && <AboutUs />
            )}
            {plans && <PlanDescription subscriptionReducer={this.props.subscriptionReducer} />}
            {aboutUs && <AboutUs />}
          </Col>
        </Row>
      </Container>
    );
  }
}
export default ProfileLayout;
