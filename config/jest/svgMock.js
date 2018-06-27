const React = require('react');

module.exports = new Proxy(
  {},
  {
    get: function getter(target, key) {
      return function(props) {
        return <svg {...props} />;
      };
    }
  }
);
