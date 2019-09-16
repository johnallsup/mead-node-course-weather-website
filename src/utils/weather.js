const request = require('request')

const make_darksky_url = (latitude,longitude) => {
    const darksky_api_token = 'd7cdf12c60fea838607aaebbee32ff7e'
    const url = `https://api.darksky.net/forecast/${darksky_api_token}/${latitude},${longitude}?units=uk2`
    return url
}

const weather = (latitude,longitude,callback) => {
    url = make_darksky_url(latitude,longitude)
    request({url:url,json:true},(error, { body }) => {
        if(error) {
            callback(`Failed to get response from server: ${error}`,undefined)
        } else if( body.error ) {
            callback(`Darksky returned an error: ${body.error}`)
        } else {
            const { hourly } = body
            const hourly_data = hourly.data
            let min_temp = 3000
            let max_temp = -274
            for(let i = 0; i < hourly_data.length; i++) {
                let t = hourly_data[i].temperature
                if( t < min_temp ) { min_temp = t }
                if( t > max_temp ) { max_temp = t }
            }
            callback(undefined,{
                latitude,
                longitude,
                summary:body.daily.data[0].summary,
                current_temperature:body.currently.temperature,
                percentage_chance_of_rain:Math.round(body.currently.precipProbability*100),
                max_temperature:max_temp,
                min_temperature:min_temp
            })
        }
    })
}

module.exports = weather
