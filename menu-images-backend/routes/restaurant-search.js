var express = require('express');
var router = express.Router();

const yelp = require('yelp-fusion');

const client = yelp.client(process.env.YELP_API_KEY)

const formatQuery = (query) => {
  if (query.lat && query.long) {
    return ({
      latitude: query.lat,
      longitude: query.long,
      categories: 'restaurants' 
    })
  } else {
    return ({
      term: query.term,
      location: query.location,
      categories: 'restaurants' 
    })
  }
};

/* GET users listing. */
router.get('/', function(req, res, next) {
  client.search(formatQuery(req.query))
  .then(response => {
    res.json([{
      restaurants: JSON.parse(response.body).businesses
    }]);
  }).catch(err => console.log('err'));
});

module.exports = router;
