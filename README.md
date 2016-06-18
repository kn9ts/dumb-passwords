[![Coverage Status](https://coveralls.io/repos/github/kn9ts/stupid-passwords/badge.svg?branch=feature%2Ftests)](https://coveralls.io/github/kn9ts/stupid-passwords?branch=feature%2Ftests)

![](http://res.cloudinary.com/dpmk2cnpi/image/upload/q_80/v1466166678/Screenshot_at_Jun_17_15-30-35_ufkfcq.png)

> #### Guard your users from security problems such as being hacked that start by having stupid passwords

> `stupid-passwords` is an NPM module that can be used to verify **the user provided password is
not one of the top 10,000 worst passwords** as analysed by a respectable IT security analyst. Read
about all [ here](https://xato.net/10-000-top-passwords-6d6380716fe0#.473dkcjfm),
[here(wired)](http://www.wired.com/2013/12/web-semantics-the-ten-thousand-worst-passwords/) or
[here(telegram)](http://www.telegraph.co.uk/technology/internet-security/10303159/Most-common-and-hackable-passwords-on-the-internet.html)

### Getting Started

#### Installation

```bash
$ npm install stupid-passwords --save
```

#### Usage

Short example:

```js
const stupidPasswords = require('stupid-passwords');

const isStupid = stupidPasswords.isStupid('123456'); // true
```

Embedding it into your [**EXPRESS**](http://expressjs.com/en/4x/api.html#app.post.method) application:

```js
'use strict';

const app = require('express')();
const stupidPasswords = require('stupid-passwords');

...

app.post('/user/create', (req, res) => {
  const userPassword = req.body.userPassword;

  if (stupidPasswords.isStupid(userPassword)) {
    const rate = stupidPasswords.rateOfUsage(userPassword);
    let message = 'Dear user, that\'s a stupid password! Why? For every 100,000 user accounts on the internet, ';
    message += rate.frequency + ' are "protected" using that same password. Hacker\'s paradise.';

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

#### stupidPasswords.isStupid(string) => true or false

Check if the string provided, representing the user's proposed submitted password is not one of the
**top 10,000 worst passwords** users use.

returns `true` if the password is one of them and `false` if the password is not.

#### stupidPasswords.rateOfUsage(string) => {password, frequency}

Checks and returns the recorded usage frequency of the related password per 100,000 user passwords.

```js
stupidPasswords.rateOfUsage('superman') // { password: 'superman', frequency: 2523 }
```
