const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utiils/forecast')
const geocode = require('./utiils/geocode')

const app = express()
const port = process.env.PORT || 3000

//Define path for Express config
const publicdirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialPath = path.join(__dirname, '../template/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicdirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Rushabh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Rushabh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Rushabh',
        sometext: 'Helpfull text'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                location: location,
                forecast: forecastdata,
                address: req.query.address
            })
        })
    })


})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Rushabh',
        error: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'rushabh',
        error: 'Page not found'
    })
})


app.listen(port, () => {
    console.log('server is up on port' + port)
})