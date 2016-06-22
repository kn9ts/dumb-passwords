[![Coverage Status](https://coveralls.io/repos/github/kn9ts/dumb-passwords/badge.svg?branch=feature%2Ftests)](https://coveralls.io/github/kn9ts/dumb-passwords?branch=feature%2Ftests)

![](http://res.cloudinary.com/dpmk2cnpi/image/upload/v1466589978/dumbPasswords_sxotda.png)

> #### Guard your users from security problems such as being hacked that start by having dumb passwords

### Introduction

`dumb-passwords` is an NPM module that can be used to verify **the user provided password is
not one of the top 10,000 worst passwords** as analysed by a respectable IT security analyst. Read
about all [ here](https://xato.net/10-000-top-passwords-6d6380716fe0#.473dkcjfm),
[here(wired)](http://www.wired.com/2013/12/web-semantics-the-ten-thousand-worst-passwords/) or
[here(telegram)](http://www.telegraph.co.uk/technology/internet-security/10303159/Most-common-and-hackable-passwords-on-the-internet.html)

### Getting Started

#### Installation

```bash
$ npm install dumb-passwords --save
```

#### Usage

Short example:

```js
const dumbPasswords = require('dumb-passwords');

const isDumb = dumbPasswords.check('123456'); // true
// or use:
// const isDumb = dumbPasswords.checkPassword('123456');
```

Embedding it into your [**EXPRESS**](http://expressjs.com/en/4x/api.html#app.post.method) application:

```js
'use strict';

const app = require('express')();
const dumbPasswords = require('dumb-passwords');

...

app.post('/user/create', (req, res) => {
  const userPassword = req.body.userPassword;

  if (dumbPasswords.check(userPassword)) {
    const rate = dumbPasswords.rateOfUsage(userPassword);
    let message = 'Dear user, that\'s a dumb password!';
    message += ' Why? For every 100,000 user accounts on the internet, ';
    message += rate.frequency + ' are "protected" using that same password.';
    message += ' Hacker\'s paradise.';

    // DO NOT send this back to your user, it's only for demo purposes
    res.status(200).send(message);
  } else {
    // that password is awesome!
    // that user SMART! Give them the key to success!
  }
});

...

app.listen(8080, () => {
  console.log('Express server listening on on port 8080');
});

// expose app
module.exports = app;
```


## API

#### dumbPasswords.check(string) => true or false

Check if the string provided, representing the user's proposed submitted password is not one of the
**top 10,000 worst passwords** users use.

returns `true` if the password is one of them and `false` if the password is not.

#### dumbPasswords.rateOfUsage(string) => {password, frequency}

Checks and returns the recorded usage frequency of the related password per 100,000 user passwords.

```js
dumbPasswords.rateOfUsage('superman') // { password: 'superman', frequency: 2523 }
```

### License

##### [MIT](https://mit-license.org/) © [Eugene Mutai](https://github.com/kn9ts) | [Kevin Gathuku](https://github.com/kevgathuku) | [Jeremy Kithome](https://github.com/andela-jkithome)

*__DISCLAIMER:__* _All opinions aired in this repo are ours and do not reflect any company or organisation any contributor is involved with._
