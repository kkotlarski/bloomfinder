import React from 'react';
import './App.css';
import Map from './components/Map';
import { formatPair } from '@mapbox/sexagesimal';

class App extends React.Component {
  state = { lngLat: [] }

  handlePositionChange = (e) => {
    this.setState({ lngLat: e.lngLat })
  }

  render() {
    const { lngLat = [] } = this.state
    const [lon, lat] = lngLat

    return (
      <div className="App">
        <header className="App-header">
          <h1>Green Tea(m) - Bloom Finder</h1>
        </header>
        <div className="App-content">
          <div className="App-map">
            <Map onChange={this.handlePositionChange} />
          </div>
          <div className="App-details">
            <p>{!!lngLat.length && formatPair({ lat, lon})}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
