const express = require('express')
const { getStoresFromCity, getBusinessReviews } = require('./lib/yelp')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000

app.get('/', async (req, res) => {
    const { city, categories } = req.query
    if (!city) {
        return res.send({ error: 'Please provide city name' })
    }
    if (!categories) {
        return res.send({ error: 'Please provide categories name' })
    }

    getStoresFromCity(city, categories).then(async allStores => {
        const promises = Object.keys(allStores).map(key => {
            return getBusinessReviews(key).then(reviewData => {
                allStores[key] = { ...allStores[key], reviews: reviewData }
            })
        })
        await Promise.all(promises).then(() => {
            return res.send(allStores)
        })
    })
})

app.listen(port, () => {
    console.log('Server is up on port 3000.')
})
