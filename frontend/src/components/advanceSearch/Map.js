//key=AIzaSyDSgVYj2CyY13I_rjy_IEfkiFBuBLssSfQ
import React, { Component } from 'react';
import { Row } from 'reactstrap';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import PrimaryButton from '../common/button/primaryButton';
import { MAP_SEARCH_KEY } from '../../utils/constants/CommonConstants';

//const latLong = [{ lat: 59.935413, long: 30.317844 }, { lat: 59.915413, long: 30.137844 }, { lat: 59.994413, long: 30.337844 }]

const AnyReactComponent = ({ text }) => <div>{text}</div>;
var drawingManager = '';
var map;
var shapes = [];


class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDrawing: false,
      showButton: false,
      drawingMode: 'rectangle',
      drawingControl: false,
      showInfo:false,
      showId:'',
    };
  }

  static defaultProps = {
    zoom: 13,
  };
  //static drawingManager;
  handleGoogleMapApi = google => {
    map = google.map;

    drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.MARKER,
      drawingControl: this.state.showButton,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_LEFT,
        drawingModes: [google.maps.drawing.OverlayType.CIRCLE, google.maps.drawing.OverlayType.POLYGON],
      },

      markerOptions: {
        icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag',
      },
      circleOptions: {
        clickable: false,
        editable: false,
        draggable: false,
        zIndex: 1,
      },
      polygonOptions: {
        clickable: true,
        editable: false,
        draggable: false,
        zIndex: 1,
      },
    });
    google.maps.event.addListener(drawingManager, 'overlaycomplete', function(e) {
      if (e.type !== google.maps.drawing.OverlayType.MARKER) {
        // Switch back to non-drawing mode after drawing a shape.
        drawingManager.setDrawingMode(null);
        // To hide:
        drawingManager.setDrawingMode({
          drawingControl: false,
        });
      }
    });

    google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
      var newShape = event.overlay;
      newShape.type = event.type;
      if (drawingManager.getDrawingMode()) {
        drawingManager.setDrawingMode(null);
      }
    });
    google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
      var newShape = event.overlay;
      newShape.type = event.type;
      shapes.push(newShape);
      if (drawingManager.getDrawingMode()) {
        drawingManager.setDrawingMode(null);
      }
    });

    google.maps.event.addListener(drawingManager, 'drawingmode_changed', event => {
      //this.props.resetMapData();
      if (drawingManager.getDrawingMode() != null) {
        for (var i = 0; i < shapes.length; i++) {
          shapes[i].setMap(null);
        }
        shapes = [];
      }
    });
    google.maps.event.addListener(drawingManager, 'overlaycomplete', event => {
      if (event.type === google.maps.drawing.OverlayType.CIRCLE) {
        const radius = event.overlay.getRadius();
        const lat = event.overlay.getCenter().lat();
        const lng = event.overlay.getCenter().lng();
        this.props.mapSearchAction({ radius, lat, lng, shape: 'circle' });
      }
      //(lat,lang)corrdinates of polygon
      if (event.type === google.maps.drawing.OverlayType.POLYGON) {
        const coordinates = event.overlay.getPath();
        //const lat=event.overlay.getPath();
        //const lng=event.overlay.getPath();
        let letLang = [];
        coordinates.forEach(el => {
          let chords = [];
          chords.push(el.lat());
          chords.push(el.lng());
          letLang.push(chords);
        });
        this.props.mapSearchAction({ latLng: letLang, shape: 'polygon' });
      }

      google.maps.event.addListener(drawingManager, 'drawingmode_changed', function() {
        if (drawingManager.getDrawingMode() != null) {
          for (var i = 0; i < shapes.length; i++) {
            shapes[i].setMap(null);
          }
          shapes = [];
        }
      });
      google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon) {});
    });
    drawingManager.setMap(map);
    google.maps.event.addListener(drawingManager, 'overlaycomplete', this.getPolygonCoords);
    google.maps.event.addListener(drawingManager, 'dragend', this.getPolygonCoords);
    drawingManager.setMap(null);
  };

  markerClicked = (id) =>{
    const {showInfo} = this.state;
    this.setState({showInfo:!showInfo});
    this.setState({showId:id});
  }

  handleClick = () => {
    this.setState({showInfo:false});
    const drawingOption = !this.state.showButton;
    this.setState({ showButton: drawingOption });
    drawingManager.setOptions({
      drawingControl: drawingOption,
    });
    drawingManager.setMap(map);
  };
  handleClick2 = () => {
    this.props.resetMap();
    {
      for (var i = 0; i < shapes.length; i++) {
        shapes[i].setMap(null);
      }
      shapes = [];
    }
  };

  onKeyDown = event => {
    if (event.keyCode === 27) {
      this.setState(() => ({
        isDrawing: false,
      }));
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  getPolygonCoords = data => {
    //const ka = data.overlay;
    this.handleClick();
  };



  render() {
    const { latLong } = this.props;
    console.log(this.props.center);
    //bring here
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <Row lg={6} className='m-1'>
          <PrimaryButton title='Draw' onClick={this.handleClick} />
          <PrimaryButton title='Clear' onClick={this.handleClick2} />
        </Row>

        <GoogleMapReact
          bootstrapURLKeys={{ libraries: 'drawing', key: MAP_SEARCH_KEY }}
          defaultCenter={this.props.center}
          onGoogleApiLoaded={this.handleGoogleMapApi}
          defaultZoom={this.props.zoom}
          onClick={this.handleClick}
          onPolygonComplete={this.onPolygonCompleted}
        >
          <AnyReactComponent lat={59.955413} lng={30.337844} text='My Marker' color='red' />
          {latLong.length > 0 &&
            latLong.map((data, index) => {
              const { marks } = this.state;
              return (
                <Marker
                  showId={this.state.showId}
                  markerClicked={this.markerClicked}
                  showInfo={this.state.showInfo}
                  key={index}
                  lat={parseFloat(data.latitude)}
                  lng={parseFloat(data.longitude)}
                  name={data.address}
                  data={data}
                  color='red'
                />
                
              );
            })}
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
