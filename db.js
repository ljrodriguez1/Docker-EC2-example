const mongoose = require('mongoose');

const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB,
    PROD,
    URL
  } = process.env;

const options = {
useNewUrlParser: true,
reconnectTries: Number.MAX_VALUE,
reconnectInterval: 500,
connectTimeoutMS: 10000,
};
let url
if (PROD==='true') {
  url = URL
} else {
  url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

}

mongoose.connect(url, options).then( function() {
  console.log('MongoDB is connected');
})
  .catch( function(err) {
  console.log(err);
});
