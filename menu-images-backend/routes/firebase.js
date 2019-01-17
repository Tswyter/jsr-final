const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const multer = require('multer');
const upload = multer(({ dest: 'uploads/'}));
const unirest = require('unirest');
const base64Img = require('base64-img');

const firebase = require('firebase');
const firebaseApp = firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID
});

const database = firebaseApp.database();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const { restaurantId } = req.query;
  const restaurantRef = database.ref(`restaurants/${restaurantId}`);
  restaurantRef.once('value').then(function(snapshot) {
    const keys = Object.keys(snapshot.val().menu);
    const values = Object.values(snapshot.val().menu);
    const formattedSnapshot = keys.map((key, i) => ({ id: key, ...values[i] }));
    res.json(formattedSnapshot);
  })
  .catch(err => res.json(err))
});

/* Add new items to restaurants */
router.post('/add-item', function(req, res, next) {
  const { restaurantId, restaurantName, name, ingredients, price, rating, accuracy, image } = req.query;
  const restaurantRef = database.ref(`restaurants/${restaurantId}/menu`);
  const sendImage = image.find(img => img.indexOf('cdn2.hubspot.net') > -1);
  const key = restaurantRef.push({
    name,
    ingredients,
    price,
    rating,
    accuracy,
    image
  }, (error) => {
    if (error) {
      res.send({ status: 'error', error });
    } else {
      console.log({ status: 'success', query: req.query });
    }
  }).key;
  const itemRef = database.ref(`restaurants/${restaurantId}/menu/${key}/images`);
  itemRef.push({
    src: sendImage,
    alt: ''
  }, (error) => {
    if (error) {
      res.send({ status: 'error', error });
    } else {
      res.send({ status: 'success', query: req.query });
    }
  })
});


router.post('/image-upload', (req,res) => {
  base64Img.img(req.body.file, 'uploads', req.body.fileName, (err, filepath) => {
    if (!err) {
      unirest.post(`http://api.hubapi.com/filemanager/api/v2/files?hapikey=${process.env.HUBSPOT_API}`)
      .headers({
        'Authorization': `Bearer ${process.env.HUBSPOT_API}`,
        'Content-Type': 'multipart/form-data'
      })
      .attach('file', filepath)
      .end((response) => {
        console.log(response.body);
        res.json({ success: 'Success!', imagePath: response.body.objects[0].url });
      });
    } else {
      res.send({ error: 'Ooops, looks like there was an error with the image...' })
    }
  });
});

router.post('/update-item', (req, res) => {
  const { restaurantId, menuItemId, filePath } = req.query;
  const menuItemImagesRef = database.ref(`restaurants/${restaurantId}/menu/${menuItemId}/images`);
  menuItemImagesRef.push({
    src: filePath,
    alt: ''
  }, (error) => {
    if (error) {
      res.send({ status: 'error', error });
    } else {
      res.send({ status: 'success', query: req.query, body: req.body });
    }
  })
});

module.exports = router;
