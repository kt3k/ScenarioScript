var parser = require('../')
var test = require('tape')

test('each line is parsed to an object', function (t) {

  var lines = parser.parse('a\nb\n\c\nd\n---')

  t.equal(lines.length, 5, 'The length is 5')

  lines.forEach(function (line) {
    t.equal(typeof line, 'object', 'The type is object')
  })

  t.end()

})

test('blank (whitespace only) lines are filtered', function (t) {

  var lines = parser.parse('a\n\n   \nb')

  t.equal(lines.length, 2, 'The length is 2')

  t.end()

})

test('`---` becomes SEPARATOR object', function (t) {

  var obj = parser.parse('---')[0];

  t.equal(obj.type, 'separator', 'The type is separator')

  t.end()

})

test('`a` is message type', function (t) {

  var obj = parser.parse('a')[0]

  t.equal(obj.type, 'message', 'It has message type')

  t.end()

})

test('parses role and params correctly', function (t) {

  var obj = parser.parse('[Vikings]  Spam spam spam spam... (singing, happily=true, elegant=false, repeat=10, foo=bar)')[0]

  t.equal(obj.type, 'message', 'The type is `message`')
  t.equal(obj.role, 'Vikings', 'The role is `Vikings`')
  t.equal(obj.message, 'Spam spam spam spam...', 'The message is `spam spam...`')
  t.deepEqual(obj.params, {singing: true, happily: true, elegant: false, repeat: 10, foo: 'bar'}, 'It parses params correctly')

  t.end()

})
