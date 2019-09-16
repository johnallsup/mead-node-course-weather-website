const geocode = require('./geocode')
const weather = require('./weather')

const get_weather = (address,handler) => {
    if(!handler) {
        handler = console.log
    }
    geocode(address,(error, { latitude, longitude, location } = {}) => {
        if( error ) {
            return handler({
                error: "Error looking up address",
                error_data: error
            },undefined)
        }
        weather(latitude,longitude, (error,{ summary, current_temperature, percentage_chance_of_rain, max_temperature, min_temperature } = {}) => {
            if( error ) {
                return handler({
                    error: "Error fetching weather data",
                    error_data: error
                },undefined)
            }
            return handler(undefined,{
                summary, current_temperature, percentage_chance_of_rain, 
                location, latitude, longitude,
                max_temperature, min_temperature,
                text: `${summary} It is ${current_temperature}C out. There is a ${percentage_chance_of_rain}% chance of rain.`
            })
        })
    })
}
module.exports = get_weather