const assert = require('assert');
const { createSandbox } = require("sinon");
const Fibonacci = require('./fibonacci');
const sinon = createSandbox();


(() => {

  /*
   * 0,1,1,2,3
   */
  {

    const fibonacci = new Fibonacci();
    const spy = sinon.spy(
      fibonacci,
      fibonacci.execute.name
    )

    for (const sequence of fibonacci.execute(3)) {
    }

    const expectedCallCount = 4;
    assert.strictEqual(spy.callCount, expectedCallCount);
  }

  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(
      fibonacci,
      fibonacci.execute.name
    )

    const results = [...fibonacci.execute(5)];

    const expectedCallCount = 6;
    assert.strictEqual(spy.callCount, expectedCallCount);

    const { args } = spy.getCall(2);
    const expectedParams = [2,2,3]; // 3,1,2
    /*
     * 5 sequences (input - 1, current, current + next)
     * [0] = input = 5, current = 0, next = 1 : result 0
     * [1] = input = 4, current = 1, next = 1 : result 1
     * [2] = input = 3, current = 1, next = 2 : result 1
     * [3] = input = 2, current = 2, next = 3 : result 1
     * [4] = input = 1, current = 3, next = 5 : result 1
     * [5] = input = 0, current = 5, next = 8 : STOP
     */
    assert.deepStrictEqual(args, expectedParams, "Arrays must be equal")

    const expectedResults = [0,1,1,2,3];
    assert.deepStrictEqual(results, expectedResults, "Arrays must be equal")
  }
})();