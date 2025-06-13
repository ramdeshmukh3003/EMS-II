const mongoose = require('mongoose');
const {DB_URL} = process.env;


const dbConnection = () => {
    mongoose.connect(DB_URL)
        .then(() => console.log('Database Connection Successfull'))
        .catch(err => console.log('Failed while Connecting With Database, \nReason : ' + err.message))
}

module.exports = dbConnection;