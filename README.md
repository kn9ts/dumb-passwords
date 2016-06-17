# Stupid Passwords NPM Module

> ### Guard your users from security problems such as being hacked that start by having stupid passwords

`stupid-passwords` is an NPM module that can be used to verify the user provided password is not one
of the top 10,000 worst passwords as analysed by a respectable IT security analyst.
[Read about it all here](https://xato.net/10-000-top-passwords-6d6380716fe0#.473dkcjfm) or from
[Wired](http://www.wired.com/2013/12/web-semantics-the-ten-thousand-worst-passwords/)

## Getting Started

#### Installation

```bash
$ npm install stupid-passwords --save
```

#### Usage

```js
'use strict';

const app = require('express')();
const stupidPasswords = require('stupid-passwords');

...

app.post('/user/create', (req, res) => {
	const userPassword = req.body.userPassword;

	if(stupidPasswords.isStupid(userPassword)) {
		const rate = stupidPasswords.rateOfUsage(userPassword);
		let message = 'That\'s a stupid password. For every 10,000 people, ';
		message += rate + ' are using that password';

		res.status(200).send(message);
	} else{
		// that password is awesome!
		// that useer SMART! Give them the key to success!
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

Checks and returns the recorded usage frequency of the related password

```js
stupidPasswords.rateOfUsage('superman') // { password: 'superman', frequency: 2523 }
```
