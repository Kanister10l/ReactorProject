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


app.get('/api/cities/getAllCities', (req, res) => {
    db.collection('cities').find().toArray()
        .then(cities => res.json(cities))
        .catch(error => {
            console.log(error);
            res.status(500).json({message: `Internal Server Error : ${error}`});
        });
});

app.post('/api/cities/addCity', );

app.post('/api/cities/removeCity', );

app.post('/api/cities/getCity', );                  //Get specific city

app.get('/api/activities/getAllActivities', );

app.get('/api/activities/getAllEvents', );

app.get('/api/activities/getAllPlaces', );

app.get('/api/activities/getAllMonuments', );

app.post('/api/activities/getActivity', );           //Get specific activity

app.get('/api/comments/getComments', );

app.post('/api/comments/addComment', );

app.post('/api/comments/removeComment', );

app.post('/api/likes/addLike', );

app.post('/api/likes/removeLike', );

app.post('/api/user/validate', );

app.post('/api/user/register', );

app.post('/api/user/addAdminPermission', );