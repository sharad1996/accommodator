import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as LocationIcon } from '../../assets/images/LocationIcon.svg';

import { ReactComponent as GradCap } from '../../assets/images/GradCap.svg';
import _  from 'lodash';
const AutoSuggestModal = props => {
  const { zipCodeReducer } = props;

  return (
    <div className='search-results'>
      <div className='content'>
        <div className='type'>
          <span className='type-icon'>
            <LocationIcon />
          </span>
          <span className='type-text'>ZipCode</span>
        </div>
        {zipCodeReducer.success === true &&
          _.has(zipCodeReducer,['responseData','data'])&& zipCodeReducer.responseData.data.length > 0 &&
          zipCodeReducer.responseData.data.map(zipCode => {
            return (
              <div className='search-item-row'>
                <Link to={{pathname: "/map-search", state: {zipcode:zipCode.zipcode }}} className='title'>
                  {zipCode.zipcode}
                </Link>
              </div>
            );
          })}
        {/*
          <div className='search-item-row'>
            <Link to='/' className='title'>l-90</Link>
            <div className='sub-title'>
              Issaquah, WA, USA
            </div>
          </div>
          <div className='search-item-row'>
            <Link to='/' className='title'>l-90</Link>
            <div className='sub-title'>
              Issaquah, WA, USA
            </div>
          </div>

          */}
        {/*

        <div className='content'>
          <div className='type'>
            <span className='type-icon'>
              <GradCap />
            </span>
            <span className='type-text'>
              Schools
            </span>
          </div>
          <div className='search-item-row'>
            <Link to='/' className='title'>Independence School Local I</Link>
            <div className='sub-title'>
              Baltimore, MD, USA
            </div>
          </div>
        </div>
          */}
      </div>
    </div>
  );
};

export default AutoSuggestModal;
