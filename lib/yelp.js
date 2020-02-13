const axios = require('axios')

const getStoresFromCity = async (city, categories) => {
    return await axios
        .get('https://api.yelp.com/v3/businesses/search', {
            headers: {
                Authorization: `Bearer ${process.env.API_KEY}`,
            },
            params: {
                location: city,
                categories, //'icecream'
                sort_by: 'rating',
                limit: 5,
            },
        })
        .then(apiResp => {
            let businessesObj = {}
            if (apiResp && apiResp.data) {
                apiResp.data.businesses.map(business => {
                    businessesObj[business.id] = {
                        name: business.name,
                        rating: business.rating,
                        address: business.location.display_address,
                    }
                })
            }
            return businessesObj
        })
        .catch(err => {
            return err
        })
}
const getBusinessReviews = async key => {
    return await axios
        .get(`https://api.yelp.com/v3/businesses/${key}/reviews`, {
            headers: {
                Authorization: `Bearer ${process.env.API_KEY}`,
            },
        })
        .then(apiResp => {
            let reviewsArr = []
            if (apiResp && apiResp.data) {
                apiResp.data.reviews.map(review => {
                    reviewsArr.push({
                        text: review.text,
                        rating: review.rating,
                        name: review.user.name,
                    })
                })
            }
            return reviewsArr
        })
        .catch(err => {
            return err
        })
}
module.exports = { getStoresFromCity, getBusinessReviews }
