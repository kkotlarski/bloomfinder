import React from 'react';
import MapGL, { Marker } from 'react-map-gl';

export default class Map extends React.Component {
    state = {
        viewport: {
            width: '100%',
            height: '100%',
            latitude: 52.410173943887735,
            longitude: 16.923203949077628,
            zoom: 8
        },
        markerCoordinates: null
    };

    handleClick = (e) => {
        const { onChange } = this.props
        this.setState({ markerCoordinates: e.lngLat})
        if (onChange) {
            onChange({ lngLat: e.lngLat })
        }
    }
    render() {
        const { markerCoordinates } = this.state
        return (
            <MapGL
                {...this.state.viewport}
                onClick={this.handleClick}
                onViewportChange={(viewport) => this.setState({ viewport })}
            >
                {markerCoordinates && <Marker longitude={markerCoordinates[0]} latitude={markerCoordinates[1]}>x</Marker>}
            </MapGL>
        );
    }
}
