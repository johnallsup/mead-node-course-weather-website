// console.log("Loaded client side javascript js/app.js")

// fetch('http://puzzle.mead.io/puzzle').then((res) => {
//     res.json().then((data) => {
//         console.log(`Got ${data}`,data)
//     })
// })

// const handler = (data) => {
//     if( data.error ) {
//         console.log("Error",data.error)
//     } else {
//         const { address, location, text } = data
//         console.log(address,location,text)
//     }
// }
// fetch('http://localhost:3000/weather?address=New%20York').then((res) => {
//     res.json().then(handler)
// })
// fetch('http://localhost:3000/weather?address=what12').then((res) => {
//     res.json().then(handler)
// })
// fetch('http://localhost:3000/weather?address=Boston').then((res) => {
//     res.json().then(handler)
// })

window.addEventListener("load", () => {
    const weather_form = document.querySelector("form")
    const output_div = document.querySelector("div.output")

    weather_form.addEventListener("submit", (event) => {
        event.preventDefault()
        output_div.textContent = "Loading..."
        const input = document.querySelector("form input")
        const address = input.value
        fetch(`http://localhost:3000/weather?address=${encodeURIComponent(address)}`).then((response) => {
            response.json().then((data) => {
                if( data.error ) {
                    output_div.innerHTML = `Error: ${data.error_data}`
                    console.log("Error",data)
                } else {
                    output_div.innerHTML = data.text
                    console.log("Success",data)
                }
            })
        })
    })
})
