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

app.get('/api/cities/removeCity', (req, res) => {
    let error = false;
    db.collection('cities').findOne({_id: ObjectID(req.query.id)})
        .then(city  => {
            city.activities.forEach((item, index) => {
                db.collection('activities').removeOne({_id: ObjectID(item._id)}, {safe: true}, (err, result) =>{
                    if (err)
                        error = true;
                });
                db.collection('comments').removeMany({activityId: item._id}, (err, result) => {
                    if (err)
                        error = true;
                });
                db.collection('likes').removeMany({activityId: item._id}, (err, result) => {
                    if (err)
                        error = true;
                });
            })
        });
    db.collection('cities').removeOne({_id: ObjectID(req.query.id)}, {safe: true}, (err, result) =>{
        if (err)
            error = true;
    });
    if (error)
        res.send("Error");
    else
        res.send("Success");
});

app.get('/api/cities/getCity', (req, res) => {
    db.collection('cities').findOne({_id: ObjectID(req.query.id)})
        .then(city => res.json(city))
        .catch(error => {
            console.log(error);
            res.status(500).json({message: `Internal Server Error : ${error}`});
        });
});                  //Get specific city

app.post('/api/activities/addActivity', function (req, res) {
    let error = false;
    db.collection('activities').insertOne(req.body, (err, result) => {
        if (err)
            error = true;
    });
    db.collection('cities').updateOne({_id: ObjectID(req.body.cityId)}, {$push: {activities: req.body}}, (err, result) => {
        if (err)
            error = true;
    });
    if (error)
        res.send("Error");
    else
        res.send("Success");
});

app.post('/api/activities/removeActivity', (req, res) => {
    let error = false;
    db.collection('activities').findOne({_id: ObjectID(req.body.id)})
        .then(act => {
            db.collection('cities').updateOne({_id: ObjectID(act.cityId)}, {
                $pull: {activities: act}
            }, (err, result) => {
                if (err)
                    error = true;
            });
        });
    db.collection('activities').removeOne({_id: ObjectID(req.body.id)}, {safe: true}, (err, result) =>{
        if (err)
            error = true;
    });
    db.collection('comments').removeMany({activityId: req.body.id}, (err, result) => {
        if (err)
            error = true;
    });
    db.collection('likes').removeMany({activityId: req.body.id}, (err, result) => {
        if (err)
            error = true;
    });
    if (error)
        res.send("Error");
    else
        res.send("Success");
});

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

app.get('/api/activities/getActivity', (req, res) => {
    db.collection('activities').findOne({_id: req.query.id})
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
    let error = false;
    db.collection('comments').insertOne(req.body, (err, result) => {
        if (err)
            error = true;
    });
    db.collection('activities').updateOne({id: ObjectID(req.body.activityId)}, {$push: {comments: req.body}}, (err, result) => {
        if (err)
            error = true;
    });
    if (error)
        res.send("Error");
    else
        res.send("Success");
});

app.post('/api/comments/removeComment', (req, res) => {
    let error = false;
    db.collection('comments').findOne({_id: ObjectID(req.body.id)})
        .then(com => {
            db.collection('activities').updateOne({_id: ObjectID(com.activityId)}, {
                $pull: {comments: com}
            }, (err, result) => {
                if (err)
                    error = true;
            });
        });
    db.collection('comments').removeOne({_id: ObjectID(req.body.id)}, (err, result) => {
        if (err)
            error = true;
    });
    if (error)
        res.send("Error");
    else
        res.send("Success");
});

app.post('/api/likes/addLike', (req, res) => {
    let error = false;
    db.collection('likes').insertOne(req.body, (err, result) => {
        if (err)
            error = true;
    });
    db.collection('activities').updateOne({id: ObjectID(req.body.activityId)}, {$push: {likes: req.body}}, (err, result) => {
        if (err)
            error = true;
    });
    if (error)
        res.send("Error");
    else
        res.send("Success");
});

app.post('/api/likes/removeLike', (req, res) => {
    let error = false;
    db.collection('likes').findOne({_id: ObjectID(req.body.id)})
        .then(like => {
            db.collection('activities').updateOne({_id: ObjectID(like.activityId)}, {
                $pull: {likes: like}
            }, (err, result) => {
                if (err)
                    error = true;
            });
        });
    db.collection('likes').removeOne({_id: ObjectID(req.body.id)}, (err, result) => {
        if (err)
            error = true;
    });
    if (error)
        res.send("Error");
    else
        res.send("Success");
});

app.post('/api/user/validate', (req, res) => {
    let match = false;
    db.collection('user').find().toArray()
        .then(users => {
            users.forEach((item, index) => {
                if (item.username === req.body.username && item.password === req.body.password)
                    match = true;
            });
            res.send(match);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({message: `Internal Server Error : ${error}`});
        });
});

app.post('/api/user/register', (req, res) => {
    let exists = false;
    let error = false;
    db.collection('user').find().toArray()
        .then(users => {
            users.forEach((item, index) => {
                if (item.username === req.body.username)
                    exists = true;
            });
            if (exists)
                res.send("Exists");
            else {
                db.collection('user').insertOne(req.body, (err, result) => {
                    if (err)
                        error = true;
                });
                if (error)
                    res.send("Error");
                else
                    res.send("Success");
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({message: `Internal Server Error : ${error}`});
        });
});

app.post('/api/user/addAdminPermission', (req, res) => {

});