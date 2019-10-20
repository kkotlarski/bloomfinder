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
      error: null,
    }
  }

  handlePositionChange = (e) => {
    const [ lon, lat ] = e.lngLat;
    this.setState({ fetching: true, error: null })
    const { startDate, endDate } = this.state

    fetch(`/.netlify/functions/data?lat=${lat}&lng=${lon}&startDate=${startDate.toISODate()}&endDate=${endDate.toISODate()}`)
      .then(res => res.json())
      .then(res => this.setState({ data: res.data, willBloom: res.willBloom, lon, lat, fetching: false }))
      .catch(error => this.setState({ fetching: false, error }))
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

  renderDetails() {
    const { lon, lat, data, fetching, error, willBloom, startDate, endDate } = this.state

    if (error) {
      return <p style={{color: 'red'}}>Failed to fetch data, try with different location</p>
    }

    const progress = fetching && <p>Fetching data...</p>
    const details = data && (
      <div>
        <p>{Boolean(lon && lat) && formatPair({ lat, lon})} {startDate.toISODate()} - {endDate.toISODate()}</p>
        <Chart data={data} dataKey="temperature" name="Temperature (C)" />
        <Chart data={data} dataKey="chlorA" name="Chlorophyll A (mg m^-3)" />
        <h3>Probability of blooming: {this.willBloomToString(willBloom)}</h3>
      </div>
    );

    return (
      <div>
        {progress}
        {details}
      </div>
    )
  }

  render() {

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
            {this.renderDetails()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
