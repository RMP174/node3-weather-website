const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=dbc0addd9bf0255984ca0ba70df150b5&query=' + address + '&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('unable to connect to geolocation services!', undefined)
        } else if (body.error) {
            callback('unable to find location coordinates', undefined)
        } else {
            callback(undefined, {
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude,
                location: body.data[0].label
            })
        }
    })

}

module.exports = geocode