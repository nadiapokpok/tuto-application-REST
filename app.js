var express = require('required')
var mongodb = require ('mongodb')

var app = express()
var MongoClient = mongodb.MongoClient

var url = 'mongodb://localhost:2701/monprojet'
MongoClient.connect(url, function (err, db ) {
    if (err) throw err
    db.collection('produits', function(err, collection){

        app.get('/produits', function(req, res){
            collection.find().toArray(function(err, produits){
                if (!err) res.send(produits)
            })
        })

        app.post('/produits', function(req, res){
            collection.insert(req.body, function (err, produit){
                if (!err) res.send(produit)
            })
        })

        app.get('/produits/:id', function (req, res){
            collection.findOne({"_id": new mongodb.ObjectID(req.params.id)}, function (err, produit){
                if(!err) res.send(produit)
            })
        })

    })

    var server = app.listen(8080)
})
    
