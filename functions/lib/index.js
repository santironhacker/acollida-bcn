"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require('../keys/admin.json');
// The Firebase Admin SDK to access the Firebase Realtime Database.
/* const admin = require('firebase-admin');

admin.initializeApp(
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://acollida-bcn.firebaseio.com'
  ); */
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://acollida-bcn.firebaseio.com"
});
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});
exports.getCampaignName = functions.https.onRequest((request, response) => {
    admin.firestore().collection('campaigns').doc('KEDLiUVy7sGtpYsU2yA6').get()
        .then((snapshot) => {
        const data = snapshot.data();
        response.send(data);
    })
        .catch((error) => {
        console.log(error);
        response.status(500).send(error);
    });
});
exports.bigben = functions.https.onRequest((req, res) => {
    const hours = (new Date().getHours() % 12) + 1; // London is UTC + 1hr;
    res.status(200).send(`<!doctype html>
    <head>
      <title>Time</title>
    </head>
    <body>
      ${'BONG '.repeat(hours)}
    </body>
  </html>`);
});
// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest(async (req, res) => {
    // Grab the text parameter.
    const original = req.query.text;
    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    const snapshot = await admin.database().ref('/messages').push({ original: original });
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    res.redirect(303, snapshot.ref.toString());
});
// Listens for new messages added to /messages/:pushId/original and creates an
// uppercase version of the message to /messages/:pushId/uppercase
/* exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
.onCreate((snapshot, context) => {
  // Grab the current value of what was written to the Realtime Database.
  const original = snapshot.val();
  console.log('Uppercasing', context.params.pushId, original);
  const uppercase = original.toUpperCase();
  // You must return a Promise when performing asynchronous tasks inside a Functions such as
  // writing to the Firebase Realtime Database.
  // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
  return snapshot.ref.parent.child('uppercase').set(uppercase);
}); */ 
//# sourceMappingURL=index.js.map