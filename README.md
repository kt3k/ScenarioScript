# ScenarioScript v1.0.0

> Script language suitable for storing scenario data.

# Example

```html
[Wife]     Have you got anything without spam?
[Waitress] Well, there's spam egg sausage and spam, that's not got much spam in it.
[Wife]     I don't want ANY spam!
[Man]      Why can't she have egg bacon spam and sausage?
[Wife]     THAT'S got spam in it!
[Man]      Hasn't got as much spam in it as spam egg sausage and spam, has it?
[Vikings]  Spam spam spam spam... (singing, repeat=10)
```

This is parsed to the following:

```json
[{
  "type": "message",
  "role": "Wife",
  "message": "Have you got anything without spam?",
  "params": {}
}, {
  "type": "message",
  "role": "Waitress",
  "message": "Well, there's spam egg sausage and spam, that's not got much spam in it.",
  "params": {}
}, {
  "type": "message",
  "role": "Wife",
  "message": "I don't want ANY spam!",
  "params": {}
}, {
  "type": "message",
  "role": "Man",
  "message": "Why can't she have egg bacon spam and sausage?",
  "params": {}
}, {
  "type": "message",
  "role": "Wife",
  "message": "THAT'S got spam in it!",
  "params": {}
}, {
  "type": "message",
  "role": "Man",
  "message": "Hasn't got as much spam in it as spam egg sausage and spam, has it?",
  "params": {}
}, {
  "type": "message",
  "role": "Vikings",
  "message": "Spam spam spam spam...",
  "params": {
    "singing": true,
    "repeat": 10
  }
}]
```

# Rules

## Basic Rules

- Empty lines means nothing.
- There are **2 types of lines**: **Message** and **Separator**
  - A separator line looks like `---`. Separators are lines which contains only dashes.
  - A message line typically looks like `[name] message (key=value, ...)`. See below for details.

## Message

Example:

```html
[Vikings]  Spam spam spam spam... (singing, repeat=10)
```

The initial part `[Vikings]` is the role of the line. In this case the role of the line is `Vikings`. The valid characters for the names for roles are anything except `]`.

The last part `(singing, repeat=10)` is the parameters of the line. In this case the parameter is equivalent as the json object:

```json
{
  "singing": true,
  "repeat": 10
}
```

The parameters are the comma-separated sequence of `key=value`. The `=value` part is optional and if it's omitted, it means `true`. If the value *looks like* a number, then it's considered as a number. If the value *looks like* a boolean, then it's considered as a boolean. Otherwise it's a string.

Role can be omitted. Example:

```html
There was a light at first
```

In this case, the role of the line is `null` and the whole line is `message` of the line.

## Separator

A separator line only has '-' in it.

Example:

```html
[ Jonathan ] How many have you killed?
[ Dio ] Do you remember how many breads you've eaten in your life?
---
[ Jonathan ] I never forgive you, Dio.
[ Dio ] Haha.
```

The `---` line above is a separator line.

***Note***:
- Any line except `separator` is a `message` line.
- There's no syntax error. Any string is valid.

# Parser package

## Install

    npm install scenarioscript

## Usage

```js
const parser = require('scenarioscript')

parser.parse(`
[Wife]     Have you got anything without spam?
[Waitress] Well, there's spam egg sausage and spam, that's not got much spam in it.
[Wife]     I don't want ANY spam!
[Man]      Why can't she have egg bacon spam and sausage?
[Wife]     THAT'S got spam in it!
[Man]      Hasn't got as much spam in it as spam egg sausage and spam, has it?
[Vikings]  Spam spam spam spam... (singing, repeat=10)
---
`) /* =>

[{
  "type": "message",
  "role": "Wife",
  "message": "Have you got anything without spam?",
  "params": {}
}, {
  "type": "message",
  "role": "Waitress",
  "message": "Well, there's spam egg sausage and spam, that's not got much spam in it.",
  "params": {}
}, {
  "type": "message",
  "role": "Wife",
  "message": "I don't want ANY spam!",
  "params": {}
}, {
  "type": "message",
  "role": "Man",
  "message": "Why can't she have egg bacon spam and sausage?",
  "params": {}
}, {
  "type": "message",
  "role": "Wife",
  "message": "THAT'S got spam in it!",
  "params": {}
}, {
  "type": "message",
  "role": "Man",
  "message": "Hasn't got as much spam in it as spam egg sausage and spam, has it?",
  "params": {}
}, {
  "type": "message",
  "role": "Vikings",
  "message": "Spam spam spam spam...",
  "params": {
    "singing": true,
    "repeat": 10
  }
}]

*/
```

## API

```js
const parser = require('scenarioscript')
```

### parser.parse(script)

- @param {string} script The script
- @return {object}

This parses the ScenarioScript and returns the parsed object representation.

# License

MIT
