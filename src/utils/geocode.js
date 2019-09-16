const request = require('request')

const make_geocode_url = (address) => {
    const mapbox_api_token = 'pk.eyJ1IjoiY2hhbGlzcXVlIiwiYSI6ImNrMDhmd2ltdDQ4cngzbnV0czRsMWFzd2UifQ.0sPFXSL6UDpERacvbzvimA'
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapbox_api_token}&limit=1`
    return url
}

const geocode = (address, callback) => {
    const url = make_geocode_url(address)
    request({ url, json: true },(error, data) => {
        if( error ) {
            callback('Error requesting data from server', undefined)
        } else if( data.body.features === undefined || data.body.features.length === 0) {
            callback('Server returned no data, try another address.', undefined)
        } else {
            const { body } = data
            const { center, place_name:location } = body.features[0]
            callback(undefined, {
                latitude: center[1],
                longitude: center[0],
                location
            })
        }
    })
}

module.exports = geocode
