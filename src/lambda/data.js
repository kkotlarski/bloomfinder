const request = require('request');
const { promisify } = require('util');

const req = promisify(request);

const toJSON = str => {
    try {
        console.log('????', str)
        const arr = str.split('\n')
        arr.pop()
        return JSON.parse('[' + arr.join(',') + ']')
    } catch (e) {
        return []
    }
}

const toCelsius = k => k ? k - 273.15 : k

exports.handler = async function (event, context) {
    const latitude = parseFloat(event.queryStringParameters.lat);
    const longitude = parseFloat(event.queryStringParameters.lng);
    const startDate = '2019-05-16' /// event.queryStringParameters.startDate;
    const endDate = '2019-06-16' /// event.queryStringParameters.endDate;
    const cRadius = .0188
    const cLat = [latitude - cRadius, latitude + cRadius]
    const cLng = [longitude - cRadius, longitude + cRadius]
    const tRadius = 2.5
    const tLat = [latitude - tRadius, latitude + tRadius]
    const tLng = [180 + longitude - tRadius, 180 + longitude + tRadius]
    const chlorA = req(`https://coastwatch.pfeg.noaa.gov/erddap/griddap/nesdisVHNSQchlaDaily.jsonlKVP?chlor_a[(${startDate}T12:00:00Z):1:(${endDate}T12:00:00Z)][(0.0):1:(0.0)][(${Math.max(...cLat)}):1:(${Math.min(...cLat)})][(${Math.min(...cLng)}):1:(${Math.max(...cLng)})]`)
    // const temp = req(`https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdHadISST.jsonlKVP?sst[(${startDate}T12:00:00Z):1:(${endDate}T12:00:00Z)][(${Math.max(...tLat)}):1:(${Math.min(...tLat)})][(${Math.min(...tLng)}):1:(${Math.max(...tLng)})]`)
    const temp = req(`https://coastwatch.pfeg.noaa.gov/erddap/griddap/esrlNcepRe.jsonlKVP?air[(${startDate}T00:00:00Z):1:(${endDate}T00:00:00Z)][(${Math.max(...tLat)}):1:(${Math.min(...tLat)})][(${Math.min(...tLng)}):1:(${Math.max(...tLng)})]`)

    const chlorAData = toJSON((await chlorA).body)
    const tempData = toJSON((await temp).body)
    const data = {}
    for (const i of chlorAData) {
        const date = i.time.substr(0, 10)
        if (data[date]) {
            data[date].chlorA = i.chlor_a || data[date].chlorA
        } else {
            data[date] = { date, clorA: i.clor_a }
        }
    }
    for (const i of tempData) {
        const date = i.time.substr(0, 10)
        if (data[date]) {
            data[date].temperature = toCelsius(i.air) || data[date].temperature
        } else {
            data[date] = { date, temperature: toCelsius(i.air) }
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify(Object.values(data))
    };
};
