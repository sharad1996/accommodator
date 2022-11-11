import React from 'react';
import { Row, Col, Container, Spinner, Alert } from 'reactstrap';
import AppartmentDetails from './AppartmentDetails';
import SimpleMap from './SimpleMap';
import './card.scss';
import PrimaryButton from '../common/button/primaryButton';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import NewModal from '../common/modal/Modal';
import { COMMON_ERROR_MSG } from '../../utils/constants/APIConstants';
import { DEFAULT_SEARCH } from '../../utils/constants/CommonConstants';

class Listing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zipCode: null,
      page: 1,
      searchQuery: {},
      startCount: 4,
      isOpenLogin: false,
      modalPage: '',
    };
  }

  componentDidMount() {
    this.props.zipCodeAction();
    const { location, mapSearchAction } = this.props;
    if (_.has(location, ['state', 'zipcode']) && !_.isEmpty(location.state.zipcode)) {
      this.setState({ zipCode: location.state.zipcode });
      mapSearchAction({ zipcode: location.state.zipcode, page: 1 });
    } else {
      this.setState({ zipCode: DEFAULT_SEARCH });
      mapSearchAction({ zipcode: DEFAULT_SEARCH, page: 1 });
    }
  }
   resetMap=()=>
   {
    this.props.zipCodeAction();
    const { location, mapSearchAction } = this.props;
    if (_.has(location, ['state', 'zipcode']) && !_.isEmpty(location.state.zipcode)) {
      this.setState({ zipCode: location.state.zipcode });
      mapSearchAction({ zipcode: location.state.zipcode, page: 1 });
    } else {
      this.setState({ zipCode: DEFAULT_SEARCH });
      mapSearchAction({ zipcode: DEFAULT_SEARCH, page: 1 });
    }

   }

  renderAlertMessages() {
    const { fail, success, responseData,error } = this.props.mapSearchReducer;
    if (success) {
      if (typeof responseData !== 'undefined' && responseData.error) {
        return (
          <Alert color='danger' fade={false}>
            {responseData.message}
          </Alert>
        );
      }
    }

    if (fail) {
      return (
        <Alert color='danger' fade={false}>
          {error.message}
        </Alert>
      );
    }
  }
  exportAlertMessage() {
    const { success, fail } = this.props.exportReducer;
    if (success) {
      return (
        <Alert color='success' isOpen={this.state.visible}>
          successfully exported!
        </Alert>
      );
    }
    if (fail) {
      return (
        <Alert color='danger' fade={false}>
          Error in exporting. Please retry again
        </Alert>
      );
    }
  }

  exportAlert = () => {
    this.setState({ visible: true }, () => {
      window.setTimeout(() => {
        this.setState({ visible: false });
      }, 2000);
    });
  };

  handleClick = () => {
    const token = localStorage.getItem('accessToken');
    if(token) {
      const { mapArgs } = this.props.mapSearchReducer;
      const { exportAction } = this.props;
      delete mapArgs.page;
      exportAction(mapArgs);
      this.exportAlert();
    } else {
      this.setState({ isOpenLogin : true, modalPage: 'login' })
    }
  };

  openLoginModal = () => {
    this.setState({ isOpenLogin: !this.state.isOpenLogin, modalPage: '' });
  }

  mapSearchData = mapQuery => {
     this.setState({page:1});
    this.props.mapSearchAction({ ...mapQuery, page:1 });
  };

  handlePagination = page => {
    this.setState({ page });
    const { mapArgs } = this.props.mapSearchReducer;
    mapArgs.page = page;
    this.props.mapSearchAction(mapArgs);
  };
  renderPatination = () => {
    const { page, startCount } = this.state;
    const { mapSearchReducer } = this.props;
    const pageCount = _.has(mapSearchReducer, ['responseData', 'data', 'leadsPage'])
      ? mapSearchReducer.responseData.data.leadsPage
      : 0;
    const liData = [];
    for (let k = 0; k < pageCount; k++) {
      if (k > startCount - 5 && k < startCount) {
        liData.push(
          <li
            onClick={() => this.handlePagination(k + 1)}
            className={`list-group-item ${page === k + 1 ? 'active' : ''}`}
          >
            <a className='text-dark' href='javascript:void(0)'>
              {k + 1}
            </a>
          </li>,
        );
      } else if (k < pageCount - 2) {
        if (k === startCount + 5) {
          liData.push(
            <li onClick={() => this.setState({ startCount: startCount + 5 })} className='list-group-item'>
              <a className='text-dark' href='javascript:void(0)'>
                .....
              </a>
            </li>,
          );
        }
      } else if (k => pageCount - 2) {
        liData.push(
          <li
            onClick={() => this.handlePagination(k + 1)}
            className={`list-group-item ${page === k + 1 ? 'active' : ''}`}
          >
            <a className='text-dark' href='javascript:void(0)'>
              {k + 1}
            </a>
          </li>,
        );
      }
    }
    return liData;
  };
  render() {
    const { mapSearchReducer,resetMapData } = this.props;
    const pageCount = _.has(mapSearchReducer, ['responseData', 'data', 'leadsPage'])
      ? mapSearchReducer.responseData.data.leadsPage
      : 0;
    const { startCount, isOpenLogin, modalPage } = this.state;
    const dataFinal =
      mapSearchReducer.responseData !== null &&
      _.has(mapSearchReducer, ['responseData', 'data', 'leadsData']) &&
      mapSearchReducer.responseData.data.leadsData.length > 0
        ? mapSearchReducer.responseData.data.leadsData
        : [];
    const paginationData = this.renderPatination();
    return (
      <div className='map-page-bg'>
        {/* <div className='d-flex search-box justify-content-center p-3 mb-3  rounded'>
          <SearchComponent
            mapSearchReducer={mapSearchReducer}
            mapSearchAction={mapSearchAction}
            history={history}
            zipCodeReducer={zipCodeReducer}
            definedSearchClass='w-50'
          />
        </div> */}
        <Container fluid>
          {this.renderAlertMessages()}
          {this.exportAlertMessage()}
          <Row>
            <Col className='map-container p-1 ' lg={6}>
              <div className='p-1'>
                <SimpleMap resetMap={this.resetMap} resetMapData={resetMapData} latLong={dataFinal} mapSearchAction={this.mapSearchData} />
              </div>
            </Col>
            <Col
              className={`${
                this.props.mapSearchReducer.searching ? 'd-flex flex-column justify-content-center' : ''
              } leads-details`}
              lg={6}
            >
              {this.props.mapSearchReducer.searching === false ? (
                <div className='pt-5'>
                  <Row>
                    <Col lg={6}>
                      <h3>Rental Listing</h3>
                      {this.state.zipCode ? (
                        <h5>
                          results for zipcode&nbsp;
                          {this.state.zipCode}
                        </h5>
                      ) : (
                        <h5>Your searched result</h5>
                      )}
                    </Col>

                    <Col lg={6} sm={10}>
                      {dataFinal.length > 0 ? (
                        <div style={{ float: 'right' }}>
                          <PrimaryButton title='Export' onClick={this.handleClick} />
                        </div>
                      ) : (
                        ''
                      )}
                      {/* <div>
                    <img style={{ float: 'right' }} src={exporticon} height={'40px'} alt='export-btn' />
                  </div> */}
                    </Col>
                  </Row>
                  <Row>
                    {dataFinal.length > 0 &&
                      dataFinal.map(resp => {
                        return (
                          <AppartmentDetails
                            name={resp.first_name}
                            email={resp.email}
                            phn={resp.mobile}
                            address={resp.address}
                          />
                        );
                      })}
                  </Row>
                  {paginationData.length > 0 && (
                    <div className='mt-2'>
                      <ul className='list-group list-group-horizontal'>
                        <li
                          className='list-group-item'
                          onClick={() => (startCount - 5 > 0 ? this.setState({ startCount: startCount - 5 }) : '')}
                        >
                          Prev
                        </li>
                        {this.renderPatination()}
                        <li
                          className='list-group-item'
                          onClick={() =>
                            startCount + 5 < pageCount ? this.setState({ startCount: startCount + 5 }) : ''
                          }
                        >
                          Next
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className='d-flex justify-content-center'>
                  <Spinner color='primary' />
                </div>
              )}
            </Col>
          </Row>
        </Container>
        <NewModal openLoginModal={this.openLoginModal} isOpenLogin={isOpenLogin} page={modalPage} />
      </div>
    );
  }
}
export default withRouter(Listing);
