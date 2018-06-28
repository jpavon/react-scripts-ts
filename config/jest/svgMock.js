const handler = {
  get: function(target, key) {
    return function(props) {
      return `svg ${JSON.stringify(props)}`;
    }
  }
};

module.exports = new Proxy({}, handler);
