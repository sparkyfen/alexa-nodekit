alexa-nodekit
===========

Amazon Echo Alexa's App Kit NodeJS Implementation

[![Build Status](https://travis-ci.org/brutalhonesty/alexa-nodekit.svg)](https://travis-ci.org/brutalhonesty/alexa-nodekit)

Usage
--------
```javascript
// Require module.
var alexa = require('alexa-nodekit');

/**
 * Store values from Echo Request.
 *
 * @param {Object} req.body The request body object coming from the Echo.
 *
 * @return {undefined} No Response.
 */
alexa.launchRequest(req.body);
alexa.intentRequest(req.body);
alexa.sessionEndedRequest(req.body);

/**
 * Respond to the Echo requests. The Content-Length header must be included in each response.
 *
 * @param {String} speech The string that Alexa should state to the user. Up to 8000 characters and no more than 24 kb.
 * @param {Object} card The card object to generate for echo.amazon.com.
 * @param {String} card.title The card title.
 * @param {String} card.subtitle The card subtitle.
 * @param {String} card.content The card content.
 * @param {Boolean} endSession Wether this response should end the session or not.
 * @param {Function} callback The callback function.
 *
 * @return {Function} The callback function.
 */
// Launch or Intent Response.
alexa.response('Welcome to my app, you can say things like <action> or <action>.', {
  title: 'Launch Card Title',
  subtitle: 'Launch Card Subtitle',
  content: 'Launch Card Content'
}, false, function (error, response) {
  if(error) {
    return console.log(error);
  }
  console.log(response);
});

// Session Ended Response.
alexa.response(function (error, response) {
  if(error) {
    return console.log(error);
  }
  console.log(response);
});
```


Examples
-------------

Example of Launch Request/Response using [ExpressJS](http://expressjs.com/).
```javascript
var alexa = require('alexa-nodekit');

// Route request and response ends up here.
exports.route = function (req, res) {
   // Grab the necessary values from the Echo request.
   alexa.launchRequest(req.body);
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
   alexa.intentRequest(req.body);
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
   alexa.sessionEndedRequest(req.body);
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

* Fork it (https://github.com/YOUR_USERNAME/alexa-nodekit/fork).
* Create your feature branch (git checkout -b my-new-feature).
* Commit your changes (git commit -am 'Added some feature.').
* Push to the branch (git push origin my-new-feature).
* Create a new pull request.


License
-----------
* [MIT](http://brutalhonesty.mit-license.org/)
* [TL;DR](https://tldrlegal.com/license/mit-license)