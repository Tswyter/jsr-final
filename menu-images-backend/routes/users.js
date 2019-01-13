var express = require('express');
var router = express.Router();

const yelp = require('yelp-fusion');

const client = yelp.client(process.env.YELP_API_KEY)

/* GET users listing. */
router.get('/', function(req, res, next) {
  client.search({
    latitude: req.query.lat,
    longitude: req.query.lang
  })
  .then(response => {
    res.json([{
      restaurants: JSON.parse(response.body).businesses
    }]);
  }).catch(err => console.log(err));
});

module.exports = router;
