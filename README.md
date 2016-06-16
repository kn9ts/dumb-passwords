# Stupid Passwords NPM Module

> ### Guard your users from security problems such as being hacked that start by having stupid passwords

`stupid-passwords` is an NPM module that can be used to verify the user provided password is not one
of the top 10,000 worst passwords as analysed by a respectable IT security analyst.
[Read about it all here](https://xato.net/10-000-top-passwords-6d6380716fe0#.473dkcjfm) or from
[Wired](http://www.wired.com/2013/12/web-semantics-the-ten-thousand-worst-passwords/)


## Very easy to use

```js
'use strict';

const app = require('express')();
const stupidPasswords = require('stupid-passwords');

...

app.post('/user/create', (req, res) => {
	if(stupidPasswords.isStupid(req.body.userPassword)) {
		const frequency = stupidPasswords.userAmongstHowMany(req.body.userPassword);
		let message = 'That\'s a stupid password. For every 10,000 people, ';
		message += frequency + ' are using that password';

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

## Installation

```bash
$ npm install stupid-passwords --save
```
