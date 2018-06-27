const React = require('react');

module.exports = new Proxy(
  {},
  {
    get: function getter(target, key) {
      return class extends React.Component {
        render() {
          return key
        }
      }
    }
  }
);
