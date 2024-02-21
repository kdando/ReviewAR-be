const seed = require('./seed')
const devData = require('../data/development-data/index')
const db = require('../connection.js');

const runSeed = () => {
    return seed(devData).then(() => db.end());
  };

runSeed()