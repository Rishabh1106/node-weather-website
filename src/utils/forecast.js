const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/6502d08fa258933922a64c4c0bf8c3f3/' + latitude + ',' + longitude
    
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            var x = body.currently.temperature;
            var y = ((x-32)*5/9).toFixed(2) //to reduced upto 2 decimal places
            
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' °F ('+ y +' °C) out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast