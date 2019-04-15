const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = callback=>{
    MongoClient.connect('mongodb+srv://Marina:nefkod-9sefQa-kusrap@clusternode-ssn1c.mongodb.net/test?retryWrites=true')
        .then(client => {
            console.log('Connect!');
            callback(client);
        })
        .catch(err=>console.log(err));
};

module.exports = mongoConnect;