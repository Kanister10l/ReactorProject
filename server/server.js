import express from 'express';
import corsPrefetch from 'cors-prefetch-middleware';
import imagesUpload from 'images-upload-middleware';
import {MongoClient, ObjectID} from 'mongodb';
import bodyParser from 'body-parser';

import {SERVER, PORT, HTTP_SERVER_PORT, HTTP_SERVER_PORT_IMAGES, IMAGES} from './constants';


const app = express();
app.use(express.static(__dirname + '/../static'));
app.use(bodyParser.json());
app.use(corsPrefetch);

let db; // global variable for getting an access to the database
MongoClient.connect('mongodb://' + SERVER)
    .then(connection => {
        db = connection.db('dbCities');
        app.listen(PORT, () => console.log('Server Listening on Port 9090'));
    })
    .catch(error => console.log('ERROR:', error));

app.post('/images', imagesUpload(
    './static/' + IMAGES,
    HTTP_SERVER_PORT_IMAGES
));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/api/cities/getAllCities', (req, res) => {
    db.collection('cities').find().toArray()
        .then(cities => res.json(cities))
        .catch(error => {
            console.log(error);
            res.status(500).json({message: `Internal Server Error : ${error}`});
        });
});

app.post('/api/cities/addCity', function (req, res) {
    db.collection('cities').insertOne(req.body, (err, result) => {
        if(err)
            res.send("Error");
        else
            res.send("Success");
    });
});

app.post('/api/cities/removeCity', (req, res) => {
    db.collection('cities').removeOne({_id: ObjectID(req.body.id)}, {safe: true}, (err, result) =>{
        if(err)
            res.send("Error");
        else
            res.send("Success");
    });
});

app.post('/api/cities/getCity', (req, res) => {
    db.collection('cities').findOne({_id: ObjectID(req.body.id)})
        .then(city => res.json(city))
        .catch(error => {
            console.log(error);
            res.status(500).json({message: `Internal Server Error : ${error}`});
        });
});                  //Get specific city

app.get('/api/activities/getAllActivities', (req, res) => {
    db.collection('activities').find().toArray()
        .then(act => res.json(act))
        .catch(error => {
            console.log(error);
            res.status(500).json({message: `Internal Server Error : ${error}`});
        });
});

app.get('/api/activities/getAllEvents', (req, res) => {
    db.collection('activities').find({nature: "event"}).toArray()
        .then(act => res.json(act))
        .catch(error => {
            console.log(error);
            res.status(500).json({message: `Internal Server Error : ${error}`});
        });
});

app.get('/api/activities/getAllPlaces', (req, res) => {
    db.collection('activities').find({nature: "place"}).toArray()
        .then(act => res.json(act))
        .catch(error => {
            console.log(error);
            res.status(500).json({message: `Internal Server Error : ${error}`});
        });
});

app.get('/api/activities/getAllMonuments', (req, res) => {
    db.collection('activities').find({nature: "monument"}).toArray()
        .then(act => res.json(act))
        .catch(error => {
            console.log(error);
            res.status(500).json({message: `Internal Server Error : ${error}`});
        });
});

app.post('/api/activities/getActivity', (req, res) => {
    db.collection('activities').findOne({_id: req.body.id})
        .then(act => res.json(act))
        .catch(error => {
            console.log(error);
            res.status(500).json({message: `Internal Server Error : ${error}`});
        });
});           //Get specific activity

app.get('/api/comments/getComments', (req, res) => {
    db.collection('comments').find().toArray()
        .then(com => res.json(com))
        .catch(error => {
            console.log(error);
            res.status(500).json({message: `Internal Server Error : ${error}`});
        });
});

app.post('/api/comments/addComment', (req, res) => {
    db.collection('comments').insertOne(req.body, (err, result) => {
        if (err)
            res.send("Error");
        else
            res.send("Success");
    });
});

app.post('/api/comments/removeComment', (req, res) => {
    bd.collection('comments').removeOne({_id: ObjectID(req.body.id)}, (err, result) => {
        if (err)
            res.send("Error");
        else
            res.send("Success");
    });
});

app.post('/api/likes/addLike', (req, res) => {
    bd.collection('comments').removeOne({_id: ObjectID(req.body.id)}, (err, result) => {
        if (err)
            res.send("Error");
        else
            res.send("Success");
    });
});

app.post('/api/likes/removeLike', (req, res) => {

});

app.post('/api/user/validate', (req, res) => {

});

app.post('/api/user/register', (req, res) => {

});

app.post('/api/user/addAdminPermission', (req, res) => {

});