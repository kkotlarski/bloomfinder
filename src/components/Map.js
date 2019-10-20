import React from 'react';
import MapGL, { Marker } from 'react-map-gl';

export default class Map extends React.Component {
    state = {
        viewport: {
            width: '100%',
            height: '100%',
            latitude: 17.87024624785989,
            longitude: -90.18648329945088,
            zoom: 4,
        },
        markerCoordinates: [-84.98169479938701, 27.670288141124395]
    };

    handleClick = (e) => {
        const { onChange } = this.props
        console.log(e)
        this.setState({ markerCoordinates: e.lngLat})
        if (onChange) {
            onChange({ lngLat: e.lngLat })
        }
    }

    componentDidMount() {
        const {markerCoordinates} = this.state
        const {onChange} = this.props
        onChange({lngLat: markerCoordinates})
    }

    render() {
        const { markerCoordinates, viewport } = this.state
        console.log(viewport)
        return (
            <MapGL
                {...viewport}
                onClick={this.handleClick}
                onViewportChange={(viewport) => this.setState({ viewport })}
            >
                {markerCoordinates && <Marker longitude={markerCoordinates[0]} latitude={markerCoordinates[1]}>x</Marker>}
            </MapGL>
        );
    }
}
