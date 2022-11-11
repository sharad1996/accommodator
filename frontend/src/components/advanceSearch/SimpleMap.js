//key=AIzaSyDSgVYj2CyY13I_rjy_IEfkiFBuBLssSfQ
import React, { Component } from 'react';
import Map from './Map';

//const latLong = [{ lat: 59.935413, long: 30.317844 }, { lat: 59.915413, long: 30.137844 }, { lat: 59.994413, long: 30.337844 }]

class SimpleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
        center: {
            lat: -33.93894719606759,
            lng: 151.23440433213864,
        },
    };
  }

  componentDidUpdate(prevProps) {
    if(this.props.latLong && this.props.latLong.length !== prevProps.latLong.length) {
      const latLongCenter = {
        lat: this.props.latLong[0] && parseFloat(this.props.latLong[0].latitude),
        lng: this.props.latLong[0] && parseFloat(this.props.latLong[0].longitude)
      };
      this.setState({ center: latLongCenter });
    }
  }

  render() {
    const { latLong, resetMapData } = this.props;
    console.log(this.state.center);
    //bring here
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        {latLong.length > 0 && 
            <Map resetMap={this.props.resetMap} center={this.state.center} resetMapData={resetMapData} latLong={latLong} mapSearchAction={this.props.mapSearchAction} />
        }
        </div>
    );
  }
}

export default SimpleMap;
