import React from 'react';
import './App.css';
import Map from './components/Map';
import Chart from './components/Chart';
import { formatPair } from '@mapbox/sexagesimal';
import { DateTime } from 'luxon';
import { parseString } from 'xml2js';
import get from 'lodash.get';

class App extends React.Component {
  constructor(props) {
    super(props)
    const now = DateTime.local()
    this.state = {
      lat: null,
      lon: null,
      startDate: now.minus({days: 30}),
      endDate: now,
      data: null
    }
  }

  handlePositionChange = (e) => {
    const [ lon, lat ] = e.lngLat;
    this.setState({ lon, lat })
    console.log('??', lon, lat)
    // const lat = '15.993747'
    // const lon = '-72.018745'
    const startDate = '2019-09-01T12:00:00Z'
    const endDate = '2019-10-31T12:00:00Z'

    fetch(`https://coastwatch.pfeg.noaa.gov/erddap/griddap/nesdisVHNSQchlaDaily.html?chlor_a[(2019-02-21T12:00:00Z):1:(2019-08-02T12:00:00Z)][(0.0):1:(0.0)][(15.993747):1:(15.99375)][(-72.018745):1:(-72.01875)]`)
    .then(res => console.log(res, res.text()))
    .catch(console.error)

    // fetch(`http://api.geodates.or2019-10-?lat=${lat}&lng=${lon}&userdate=kko2019-10-=H`)
  }

  render() {
    const { lon, lat, data, startDate, endDate } = this.state

    const chartData = [
      {
    "date": "2019-10-13",
    "uv": 4000,
    "pv": 2400,
    "amt": 2400
  },
  {
    "date": "2019-10-14",
    "uv": 3000,
    "pv": 1398,
    "amt": 2210
  },
  {
    "date": "2019-10-15",
    "uv": 2000,
    "pv": 9800,
    "amt": 2290
  },
  {
    "date": "2019-10-16",
    "uv": 2780,
    "pv": 3908,
    "amt": 2000
  },
  {
    "date": "2019-10-17",
    "uv": 1890,
    "pv": 4800,
    "amt": 2181
  },
  {
    "date": "2019-10-18",
    "uv": 2390,
    "pv": 3800,
    "amt": 2500
  },
  {
    "date": "2019-10-19",
    "uv": 3490,
    "pv": 4300,
    "amt": 2100
  }
    ]

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
            <Chart data={chartData} />
          </div>
        </div>
      </div>
    )
  }
}

export default App;
