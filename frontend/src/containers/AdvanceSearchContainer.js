import React from 'react';
import { connect } from 'react-redux';
import { mapSearchAction,resetMapData } from '../store/LeadsStore/MapStore';
import SearchLayout from '../components/advanceSearch/SearchLayout';
import {exportAction} from '../store/LeadsStore/Export';
import { zipCodeAction } from '../store/LeadsStore/ZipCode';
class AdvanceSearchContainer extends React.Component {
  render() {
    const { mapSearchReducer, mapSearchAction,exportAction,exportReducer,zipCodeAction, zipCodeReducer,resetMapData } = this.props
    return (
      <SearchLayout
        mapSearchReducer={mapSearchReducer}
        mapSearchAction={mapSearchAction}
        exportAction={exportAction}
        exportReducer={exportReducer}
        zipCodeAction={zipCodeAction}
        zipCodeReducer={zipCodeReducer}
        resetMapData={resetMapData}
      />
    )
  }
}
const mapStateToProps = ({ mapReducer }) => {
  const { mapSearchReducer,exportReducer,zipCodeReducer } = mapReducer;
  return {
    mapSearchReducer,
    exportReducer,
    zipCodeReducer
  };
};

const mapDispatchToProps = () => {
  return {
    mapSearchAction,
    exportAction,
    zipCodeAction,
    resetMapData
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(AdvanceSearchContainer);