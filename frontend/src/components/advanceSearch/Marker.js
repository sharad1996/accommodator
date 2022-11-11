import React from 'react';
import './card.scss';
const InfoWindow = props => (
  props.id === props.showId && props.show ? (
  <div className="infoWindow">
    <p>{props.name}</p>
    <p>{props.address}</p>
    
  </div>
  ) : null
)



class Marker extends React.Component {
  constructor(props){
    super(props);
    this.state={
      showInfo:false
    }
  }
  markerClicked = () =>{
    const {showInfo} = this.state;
    this.setState({showInfo:!showInfo});
  }
  render(){
    const { color, name,key,data} = this.props;
      return (
        <div key={key} onClick={()=>this.props.markerClicked(data.id)}>
          <div
            className="pin bounce"
            style={{ backgroundColor: color, cursor: 'pointer' }}
            title={name}
          />
          <InfoWindow id={data.id} showId={this.props.showId} show={this.props.showInfo} name={data.first_name} address={data.address} />
          <div className="pulse" />
        </div>
      );
  }
}

export default Marker;
