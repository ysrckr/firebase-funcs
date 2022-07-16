/* eslint-disable indent */
const functions = require("firebase-functions");

// http request 1

exports.randomNumber = functions.https.onRequest((req, res) => {
  const number = Math.round(Math.random() * 100);
  res.send(number.toString());
});

// http request 2

/* exports.randomNumber = functions.https.onRequest((req, res) => {
  res.redirect("https://www.google.com");
}); */

// http callable function

exports.sayHello = functions.https.onCall((data, context) => {
    // eslint-disable-next-line quotes
    return `Hello ninja`;
});

