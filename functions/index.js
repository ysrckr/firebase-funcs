const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// Auth Trigger New User Sign Up

exports.newUserSignUp = functions.auth.user().onCreate((user) => {
  // For background triggers you ust return a value/promise
  return admin.firestore().collection("users").doc(user.uid).set({
    email: user.email,
    upvotedOn: [],
  });
});
// Auth Trigger User Delete
exports.userDeleted = functions.auth.user().onDelete((user) => {
  // For background triggers you ust return a value/promise
  const doc = admin.firestore().collection("users").doc(user.uid);
  return doc.delete();
});

// http callable function (adding a request)
exports.addRequest = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions
        .https
        .HttpsError("unauthenticated", "User not logged in");
  }
  if (data.text.lenght > 30) {
    throw new functions
        .https
        .HttpsError("invalid-argument", "Request text is too long");
  }
  return admin.firestore().collection("requests").add({
    text: data.text,
    upvotes: 0,
  });
});
