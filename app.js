// import the path library
const path= require("path");
// import the express library
const express = require("express");
// import the zippity-do-dah library
const zipdb = require("zippity-do-dah");
// import the forecastio library
const forecastIo = require("forecastio");

// init the instance of express app
const app = express()

// init the instance of forecastio library with a unique api key
const weather = new forecastIo("your forecastio api key here")

// establish the public path as a directory to serve from/to display from
app.use(express.static(path.resolve(__dirname, "public")))


// establish the view dir page
app.use('views', path.resolve(__dirname, 'views'))

// establish express view engine
app.set('view engine', 'ejs')

// make root renders for index.ejs
app.get("/", (req, res) => {
    res.render('index')
})

// regex for zip code
app.get(/^\/(\d{5})$/, (req, res, next) => {
    let zipcode = req.params[0]
    let location = zipdb.zipcode(zipcode)
    if (!location.zipcode) {
        next()
        return
    }


    let latitude = location.latitude
    let longitude = location.longitude

    weather.forecast(latitude, longitude, (err, data) => {
        if (err) {
            next()
            return 
        }
        res.json({
            zipcode: zipcode,
            temperature: data.currently.temperature
        })
    })
})


app.use((req, res) => {
    res.status(404).render('404')
})

app.listen(3000)