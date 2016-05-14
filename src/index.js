var SEPARATOR = 'separator'
var MESSAGE = 'message'
/**
 * Parses ScenarioScript.
 * @param {string}
 * @return {Object} This has type: string, keys; role: string, message: string, params: object
 */
exports.parse = function (script) {

  return script.split(/\n/).map(trim).filter(Boolean).map(parseLine)

}

/**
 * @param {string} line The line of scenario
 */
function trim(line) {

  if (!line) {
    return line
  }

  return line.replace(/^\s*|\s$/g, '')

}

/**
 * Parses a line.
 * @param {string} line The line
 * @return {object}
 */
function parseLine(line) {

  var type = getType(line)

  if (type === SEPARATOR) {

    return createSeparatorObj(line)

  } else { // type is MESSAGE

    return createMessageObj(line)

  }

}

/**
 * Gets the type of the line.
 * @param {string} line The line
 */
function getType(line) {

  if (/^-+$/.test(line)) {

    return SEPARATOR

  } else {

    return MESSAGE

  }

}

/**
 * Creates the separator object.
 * @param {string} line The line
 * @return {object}
 */
function createSeparatorObj(line) {

  return new Line({
    type: SEPARATOR,
    role: null,
    message: null,
    params: {size: line.length}
  })

}

var messageHeadRe = /^\s*(\[([^\]]*)\])?(.*)$/
var messageTailRe = /\((.*)\)\s*$/

/**
 * Creates the message object.
 * @param {string} line The line
 * @return {object}
 */
function createMessageObj(line) {

  var match0 = line.match(messageHeadRe)

  var role = trim(match0[2])

  var messageTail = trim(match0[3])

  var match1 = messageTail.match(messageTailRe)

  var message = trim(messageTail.replace(messageTailRe, ''))

  var params = match1 && match1[1] && parseParams(match1[1])

  return new Line({
    type: MESSAGE,
    role: role,
    message: message,
    params: params
  })

}

/**
 * Returns the object of the given string of key and value pairs.
 * @param {string} str The key value string
 * @return {object}
 */
function parseParams(str) {

  var params = {}

  var pairs = str.split(',').map(trim).map(parseKeyValue)

  pairs.forEach(function (kv) {

    params[kv.key] = kv.value

  })

  return params

}

/**
 * Parses the string as a pair of key and value.
 * @param {string} str
 * @return
 */
function parseKeyValue(str) {
  var index = str.indexOf('=')

  if (index === -1) {

    // If the = sign is missing, then the value is true.
    return {key: str, value: true}

  } else {

    return {
      key: str.substring(0, index),
      value: parseValue(str.substring(index + 1))
    }

  }

}

/**
 * RegExp which represents the number in JSON.
 * http://stackoverflow.com/questions/13340717/json-numbers-regular-expression
 */
var numberRE = /-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/

/**
 * Parses the string as value.
 *
 * This casts the str to boolean or number if it looks like those. Otherwise this does nothing.
 * @param {string} str The string
 * @return {object}
 */
function parseValue(str) {

  if (/true/i.test(str)) {

    return true

  } else if (/false/i.test(str)) {

    return false

  } else if (numberRE.test(str)) {

    return +str

  } else {

    return str

  }

}

/**
 * @constructor
 * @param {object} params The parameters
 */
function Line(params) {

  this.type = params.type
  this.role = params.role
  this.message = params.message
  this.params = params.params || {}

}
