const assert = require('assert');
const Fibonacci = require('./fibonacci')

;(() => {
  {
    const fibonacci = new Fibonacci();
    const result = fibonacci.execute();
    // assert.deepEqual(1, 1);
  }
})();