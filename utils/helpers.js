const gradients = require('./gradient.json');

module.exports = randomGradient = () => (
  gradients[Math.round(gradients.length * Math.random())]
);
