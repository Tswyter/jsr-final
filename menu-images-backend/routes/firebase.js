var express = require('express');
var router = express.Router();

var firebase = require('firebase');
var firebaseApp = firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID
});

var database = firebaseApp.database();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const { restaurantId } = req.query;
  const restaurantRef = database.ref(`restaurants/${restaurantId}`);
  console.log(restaurantRef)
  restaurantRef.once('value').then(function(snapshot) {
    res.json(snapshot)
  })
  .catch(err => res.json(err))
});

router.post('/add-item', function(req, res, next) {
  const { restaurantId, restaurantName, name, ingredients, price, rating, accuracy } = req.query;
  const restaurantRef = database.ref(`restaurants/${restaurantId}/menu`);
  restaurantRef.push({
    name,
    ingredients,
    price,
    rating,
    accuracy
  }, (error) => {
    if (error) {
      res.send({ status: 'error', error });
    } else {
      res.send({ status: 'success', query: req.query });
    }
  });

  
  // check if restaurant exists in database
  // if not, add restaurant details from yelp w/ menu item
  // if so, append a new menu item to existing restaurant
});

module.exports = router;
