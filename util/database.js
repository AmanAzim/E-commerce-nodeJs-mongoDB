const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
    MongoClient.connect('mongodb+srv://aman_azim:aman@cluster0-hq0lj.mongodb.net/shop?retryWrites=true&w=majority', { useNewUrlParser: true } ) // we get it from mongoDB>Clusters>connect
        .then(client => {
            console.log('mongodb connected successfully');
            //_db = client.db('test'); //to over write the connected database
            _db = client.db();
            callback();
        }).catch(err => {
            console.log(err);
            throw err;
        });
};

const getDB = () => {
    if ( _db ) {
        return _db;
    }
    throw 'No database found !';
};

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;