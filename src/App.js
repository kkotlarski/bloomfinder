import React from 'react';
import './App.css';
import Map from './components/Map';
import Chart from './components/Chart';
import { formatPair } from '@mapbox/sexagesimal';
import { DateTime } from 'luxon';

class App extends React.Component {
  constructor(props) {
    super(props)
    const now = DateTime.local()
    this.state = {
      lat: null,
      lon: null,
      startDate: now.minus({days: 28}),
      endDate: now.minus({days: 14}),
      data: null,
      willBloom: null,
    }
  }

  handlePositionChange = (e) => {
    const [ lon, lat ] = e.lngLat;
    this.setState({ lon, lat })
    const { startDate, endDate } = this.state

    fetch(`/.netlify/functions/data?lat=${lat}&lng=${lon}&startDate=${startDate.toISODate()}&endDate=${endDate.toISODate()}`)
      .then(res => res.json())
      .then(res => this.setState({ data: res.data, willBloom: res.willBloom }))
  }

  willBloomToString(willBloom) {
    if (willBloom > .66) {
      return 'high';
    } else if (willBloom > .33) {
      return 'medium';
    } else {
      return 'low';
    }
  }

  render() {
    const { lon, lat, data, willBloom, startDate, endDate } = this.state

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
            <p>{Boolean(lon && lat) && formatPair({ lat, lon})} {startDate.toISODate()} - {endDate.toISODate()}</p>
            <Chart data={data} dataKey="temperature" name="Temperature (C)" />
            <Chart data={data} dataKey="chlorA" name="Chlorophyll A (mg m^-3)" />
            <h3>Probability of blooming: {this.willBloomToString(willBloom)}</h3>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
