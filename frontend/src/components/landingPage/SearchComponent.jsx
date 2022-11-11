import React, { useState } from 'react';
import { Form, Input } from 'reactstrap';
import { ReactComponent as ClearIcon } from '../../assets/images/CrossInCircle.svg';
import { ReactComponent as SearchIcon } from '../../assets/images/SearchIcon.svg';
import './SearchComponent.scss';
import AutoSuggestModal from './AutoSuggestModal';

const SearchComponent = props => {
  const [searchQuery, handleSearchQuery] = useState('');
  const handleInputChange = event => {
    handleSearchQuery(event.target.value);
  };
  const handleResetForm = () => handleSearchQuery('');

  // const searchResult = () => { }

  const handleSubmit = async () => {
    props.history.push({ pathname: '/map-search', state: { zipcode: searchQuery } });
  };
  const { zipCodeReducer, definedSearchClass } = props;
 

  return (
    <div className={`${typeof definedSearchClass !== 'undefined' ? definedSearchClass : ''} search-main`}>
      <Form className='search-form' onReset={handleResetForm}>
        <Input
          autoComplete={'off'}
          type='text'
          placeholder='City, Address, School, Agent, ZIP'
          name='searchQuery'
          value={searchQuery}
          onChange={handleInputChange}
        />

        {searchQuery && (
          <button className='clear-icon' type='reset'>
            <ClearIcon />
          </button>
        )}
        <button
          className='search-btn'
          type='button'
          onClick={handleSubmit}
          disabled={props.mapSearchReducer.searching || searchQuery === ''}/>

        <button className='search-btn' type='button' onClick={handleSubmit} >

          <SearchIcon />
        </button>
      </Form>

      {searchQuery && <AutoSuggestModal zipCodeReducer={zipCodeReducer} />}
    </div>
  );
};

export default SearchComponent;
