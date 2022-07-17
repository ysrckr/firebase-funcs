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
// upVote callable function
exports.upVote = functions.https.onCall((data, context) => {
  // User must be logged in
  if (!context.auth) {
    throw new functions
        .https
        .HttpsError("unauthenticated", "User not logged in");
  }
  // Get the user
  const user = admin.firestore().collection("users").doc(context.auth.uid);
  // Get the request
  const request = admin.firestore().collection("requests").doc(data.id);
  return user.get().then((doc) => {
  // Check if user has already upvoted
    if (doc.data().upvotedOn.includes(data.id)) {
      throw new functions
          .https
          .HttpsError("invalid-argument", "User has already upvoted");
    }
    // Add the request to the user's upvotedOn array
    return user.update({
      upvotedOn: [...doc.data().upvotedOn, data.id],
    });
  }).then(() => {
    // Add one to the request's upvotes
    return request.update({
      upvotes: admin.firestore.FieldValue.increment(1),
    });
  }).catch((error) => {
    console.log(error);
  });
});


exports.deleteRequest = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions
        .https
        .HttpsError("unauthenticated", "User not logged in");
  }
  const doc = admin.firestore().collection("requests").doc(data.id);
  return doc.delete();
});
