alexa-nodekit
===========

Amazon Echo Alexa's App Kit NodeJS Implementation

Usage
--------

Example of Launch Request/Response using [ExpressJS](http://expressjs.com/).
```javascript
var alexa = require('alexa-nodekit');

// Route request and response ends up here.
exports.route = function (req, res) {
   // Grab the necessary values from the Echo request.
   alexa.launchRequest(req);
   // Store the session and/or user data

   // Respond to the Echo
   alexa.response('Welcome to my app, you can say things like <action> or <action>.', {
     title: 'Launch Card Title',
     subtitle: 'Launch Card Subtitle',
     content: 'Launch Card Content'
   }, false, function (error, response) {
     if(error) {
       return res.status(400).jsonp({message: error});
     }
     return res.jsonp(response);
   });
};
```

Example of Intent Request/Response using [ExpressJS](http://expressjs.com).
```javascript
var alexa = require('alexa-nodekit');

// Same route used as launch, request and response ends up here.
exports.route = function (req, res) {
   // Grab the necessary values from the Echo request.
   alexa.intentRequest(req);
   // Check session and/or user data
   // Check the Intent Name and Intent Slots to decide on what logic to kick off.

   // Respond to the Echo
   alexa.response('I am an Echo response based on your intent.', {
     title: 'Intent Card Title',
     subtitle: 'Intent Card Subtitle',
     content: 'Intent Card Content'
   }, true, function (error, response) {
     if(error) {
       return res.status(400).jsonp({message: error});
     }
     return res.jsonp(response);
   });
};
```

Example of Session Ended Request/Response using [ExpressJS](http://expressjs.com).
```javascript
var alexa = require('alexa-nodekit');

// Same route used as launch and intent, request and response ends up here.
exports.route = function (req, res) {
   // Grab the necessary values from the Echo request.
   alexa.sessionEndedRequest(req);
   // Check session and delete it.

   // Respond to the Echo
   alexa.response(function (error, response) {
     if(error) {
       return res.status(400).jsonp({message: error});
     }
     return res.jsonp(response);
   });
};
```

Testing
---------

```bash
$ npm test
```

Contributions
-----------------

* Fork it (https://github.com/<username>/alexa-nodekit/fork ).
* Create your feature branch (git checkout -b my-new-feature).
* Commit your changes (git commit -am 'Added some feature.').
* Push to the branch (git push origin my-new-feature).
* Create a new pull request.


License
-----------
* [MIT](http://brutalhonesty.mit-license.org/)
* [TL;DR](https://tldrlegal.com/license/mit-license)