const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c43512c2dceaca0c4f58caff6c15368d&query=' + latitude + ',' + longitude + '&units=m'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('unable to connect to weather services!', undefined)
        } else if (body.error) {
            callback('unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degree temperature . It feels like ' + body.current.feelslike + ' degree temperature. Humidity is ' + body.current.humidity)
        }
    })
}

module.exports = forecast