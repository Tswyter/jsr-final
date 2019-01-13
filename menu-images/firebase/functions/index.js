const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions


// endpoint: https://us-central1-picture-menu-a4ddc.cloudfunctions.net/helloWorld
exports.helloWorld = functions.https.onRequest((request, response) => {
  if (request.method !== 'POST') {
    return resizeBy.status(500).json({
      message: 'Not allowed'
    });
  }
  response.status(200).json({
    message: 'it worked!'
  })
});
