const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.setUser = functions.https.onRequest(async(req, res) => {
    console.log(req.query.user);
    const snapshot = await admin.firestore().collection('User').doc("user").set({ data: req.query.user });
    admin.firestore().doc('User/user').get().then(snapshot => {
        res.send(snapshot.data());
        return snapshot.data();
    }).catch(error => {
        res.send("error");
        throw new Error("error");
    });
});

exports.getUser = functions.https.onRequest(async(req, res) => {
    console.log(req.query.user);
    admin.firestore().doc('User/user').get().then(snapshot => {
        res.send(snapshot.data());
        return snapshot.data();
    }).catch(error => {
        res.send("error");
        throw new Error("error");
    });
});


exports.getData = functions.https.onRequest(async(req, res) => {
    console.log(req.query.data);
    const data = JSON.parse(req.query.data);
    admin.firestore().doc('uploads/' + data.user).get().then(snapshot => {
        res.send(snapshot.data());
        return snapshot.data();
    }).catch(error => {
        res.send("error");
        throw new Error("error");
    });
});

exports.getOutput = functions.https.onRequest(async(req, res) => {
    console.log(req.query.data);
    const data = JSON.parse(req.query.data);
    admin.firestore().doc('uploads/' + data.user).get().then(snapshot => {
        res.send(snapshot.data());
        return snapshot.data();
    }).catch(error => {
        res.send("error");
        throw new Error("error");
    });
});

exports.addData = functions.https.onRequest(async(req, res) => {
    console.log(req.query.data);
    const data = JSON.parse(req.query.data);
    const snapshot = await admin.firestore().collection('uploads').doc(data.user).update({ data: data.after_data });
    admin.firestore().doc('uploads/' + data.user).get().then(snapshot => {
        output_data_set = true;
        res.send(snapshot.data());
        return snapshot.data();
    }).catch(error => {
        res.status(400).send(error);
        throw new Error("output not set");
    });
});