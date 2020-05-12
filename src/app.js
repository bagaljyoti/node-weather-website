const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()

//Define paths for Express Config...
const publicDirectoryPath = path.join(__dirname, '../public')
const viewspath= path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname,'../templates/partials')

//Setup Handlebars engine & Views location...
app.set('view engine', 'hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)

//Setup Static Directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req,res) => {
    res.render('index', {
        title: 'weather',
        name: 'Jyoti Bagal'
    })
})

app.get('/about',(req,res) => {
    res.render('about', {
        title: 'About Nature',
        name: 'Jyoti Bagal'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must Provide Address!'
        })
    }

    geocode(req.query.address, (error,{latitude,longitude,location} = {}) => {
        if(error){
            return res.send({error})
        }
    forecast(latitude,longitude,(error,forecastdata) => {
        if(error)
        {
            return res.send({error})
        }

        res.send({
            forecast:forecastdata,
            location,
            address: req.query.address
        })
    })
    })
    // res.send({
    //     forecast: 'It is Snowing',
    //     location: 'philadelphia',
    //     address: req.query.address
    // })
})

app.get('/product',(req,res) => {
    if(!req.query.search){
       return res.send({
            error:'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help',(req,res) => {
    res.render('help', {
        msg:'Help Messege',
        title:'HELP',
        name: 'Jyoti Bagal'
    })
})

// app.get('', (req, res) => {
//     res.send('Hello Express!')
// })
// app.get('/help', (req,res) => {
//     res.send('<h1>Help Page!<h1>')
// })
// app.get('/about', (req,res) => {
//     res.send ([{
//         name : 'Jyoti'
//     },{
//         location: 'Pune'
//     }])
// })
// app.get('/weather',(req,res) => {
//     res.send('Weather Page!')
// })

app.get('/help/*', (req,res) => {
    res.render('404', {
        title:'404',
        name: 'Jyoti Bagal',
        errormsg: 'Help Artical Not Found!'
    })
})

app.get('*',(req,res) => {
    res.render('404', {
        title: '404',
        name: 'Jyoti Bagal',
        errormsg: 'Page Not Found!'
    })
})
app.listen(3000, () => {
    console.log('server is up on port 3000.')
})