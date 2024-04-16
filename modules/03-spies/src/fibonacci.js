class Fibonacci {

  /**
   * 0,1,1,2,3,5,8,13,21
   */

  * execute(input, current = 0, next = 1) {
    if (!input) {
      return
    }

    yield current

    yield* this.execute(input - 1, next, current + next);
  }
}

module.exports = Fibonacci;