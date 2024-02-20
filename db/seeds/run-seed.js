const seed = require('./seed')
const testData = require('../data/test-data/index')
const db = require('../connection.js');

const runSeed = () => {
    return seed(testData).then(() => db.end());
  };

runSeed()