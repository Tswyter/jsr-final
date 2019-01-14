const express = require('express');
const router = express.Router();

const Multer = require('multer');
const googleStorage = require('@google-cloud/storage');
const storage = googleStorage({
  projectId: process.env.FIREBASE_PROJECT_ID,
  keyFileName: process.env.GCLOUD_STORAGE_KEY
});
const bucket = storage.bucket(process.env.FIREBASE_STORAGE_BUCKET);

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

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


app.post('/image-upload', multer.single('file'), (req,res) => {
  let file = req.file;
  if (file) {
    uploadImageToStorage(file).then((success) => {
      res.status(200).send({
        status: 'success',
        url: success
      })
    }).catch(err => console.error(err));
  }
});

const uploadImageToStorage = (file) => {
  let promise = new Promise((resolve, reject) => {
    if (!file) {
      reject('No image file!');
    }

    let newFileName = `${file.originalname}_${Date.now()}`;

    let fileUpload = bucket.file(newFileName);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype
      }
    });

    blobStream.on('error', (error) => {
      reject('Something is wrong! Unable to upload at the moment.');
    });

    blobStream.on('finish', () => {
      const url = format(`https://storage.googleapis.com/${bucket.name}/${fileUPload.name}`);
      resolve(url);
    });

    blobStream.end(file.buffer);
  });

  return promise;
}

module.exports = router;
