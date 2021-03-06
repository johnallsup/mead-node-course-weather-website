window.addEventListener("load", () => {
    const weather_form = document.querySelector("form")
    const output_div = document.querySelector("div.output")

    weather_form.addEventListener("submit", (event) => {
        event.preventDefault()
        output_div.textContent = "Loading..."
        const input = document.querySelector("form input")
        const address = input.value
        fetch(`/weather?address=${encodeURIComponent(address)}`).then((response) => {
            response.json().then((data) => {
                if( data.error ) {
                    output_div.innerHTML = `Error: ${data.error_data}`
                    console.log("Error",data)
                } else {
                    console.log(data)
                    output_div.innerHTML = `${data.location}<br />${data.text}<br />Min temperature: ${data.min_temperature} Max temperature: ${data.max_temperature}`
                    console.log("Success",data)
                }
            })
        })
    })
})
