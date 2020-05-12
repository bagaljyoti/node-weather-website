const request= require('request')

const forecast = (latitude, longitude, callback) => {
const url = 'http://api.weatherstack.com/current?access_key=87ed696df4024a489656606d17a5c9b9&query=' + latitude+ ',' + longitude + '&units=m'

request({url, json: true}, (error,{body}) => {
    if(error){
        callback('Unable to connect to weather service!',undefined)
    }else if (body.error){
        callback('Unable to find location', undefined)
    }else {
        callback(undefined,body.current.weather_descriptions[0] + ". It is Currently " + body.current.temperature + " degrees out. There is " +body.current.precip + "% chance of rain.")
    }
})
}
module.exports=forecast