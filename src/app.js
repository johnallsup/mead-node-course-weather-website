const path = require('path')

const express = require('express')
const hbs = require('hbs')

const get_weather = require('./utils/get_weather')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const public_dir = path.join(__dirname,"../public")
const views_dir = path.join(__dirname,"../templates/views")
const partials_dir = path.join(__dirname,"../templates/partials")
console.log(`Using public directory: ${public_dir}`)
console.log(`Using views directory: ${views_dir}`)

// Set up handlebars
app.set('views',views_dir)
app.set('view engine','hbs')
hbs.registerPartials(partials_dir)

// Set up static directory to serve
app.use(express.static(public_dir))

app.get('',(req,res) => {
    res.render('index',{
        title: "Welcome",
        Verbum: "Verbum",
        name: "Dishwater Dave"
    })
})
app.get('/about',(req,res) => {
    res.render('about',{
        title: "About Mary's arse?",
        name: "Bob the Ball"
    })
})
app.get('/help',(req,res) => {
    res.render('help',{
        help_text: 'This is some helpful text.',
        title: 'Help',
        name: 'Bob the Ball'
    })
})
app.get('/help/*',(req,res) => {
    const { originalUrl } = req
    const query = originalUrl.substr('help'.length+2)
    res.render('help', {
        help_text: `Help for ${query}`,
        title: `Help: ${query}`,
        name: `Bob the Ball`
    })
})
app.get('/weather', (req,res) => {
    if(!req.query.address) {
        return res.send({
            error: "No address specified"
        })
    }
    get_weather(req.query.address,(error,data) => {
        if(error) {
            return res.send(error)
        } else {
            let data_to_send = {address:req.query.address}
            Object.assign(data_to_send,data)
            return res.send(data_to_send)
        }
    })
})
app.get('/products', (req,res) => {
    if(!req.query.search) {
        return res.send({
            error: "You must supply a search term"
        })
    }
    res.send({
        products: []
    })
})
app.get('*',(req,res) => {
    const { originalUrl } = req
    res.render('404',{
        title: "Ouch!",
        name: "Sammy the snail",
        error_message: `Nope, not a sausage! Are you sure you typed ${originalUrl} correctly?`
    })
})

// Start the app
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})
