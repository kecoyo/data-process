const util = require('util');

console.log(util.format('%s:%s', 'foo'));
console.log(util.format('%s:%s', 'foo', 'bar', 'baz'));
console.log(util.formatWithOptions({ colors: true }, 'See object %O', { foo: 42 }));

function fn() {
  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject(null);
}
const callbackFunction = util.callbackify(fn);

callbackFunction((err, ret) => {
  // When the Promise was rejected with `null` it is wrapped with an Error and
  // the original value is stored in `reason`.
});

class Foo {
  constructor() {
    this.a = 42;
  }

  bar(callback) {
    callback(null, this.a);
  }
}
const foo = new Foo();
const naiveBar = util.promisify(foo.bar);
// TypeError: Cannot read property 'a' of undefined
// naiveBar().then(a => console.log(a));
naiveBar.call(foo).then(a => console.log(a)); // '42'
const bindBar = naiveBar.bind(foo);
bindBar().then(a => console.log(a)); // '42'
