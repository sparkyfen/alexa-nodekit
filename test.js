'use strict';
var alexa = require('./index');
var should = require('should');

describe('Amazon Echo NodeJS ToolKit', function () {

  describe('Echo Launch Request', function () {
    it('should successfully construct a valid launch response', function (done) {
      var req = {
        body: {
          "version": "1.0",
          "session": {
            "new": true,
            "sessionId": "amzn1.echo-api.session.abeee1a7-aee0-41e6-8192-e6faaed9f5ef",
            "attributes": {},
            "user": {
              "userId": "amzn1.account.AM3B227HF3FAM1B261HK7FFM3A2"
            }
          },
          "request": {
            "type": "LaunchRequest",
            "requestId": "amzn1.echo-api.request.9cdaa4db-f20e-4c58-8d01-c75322d6c423"
          }
        }
      };
      alexa.launchRequest(req.body);
      // Testing..
      alexa.sessionId.should.be.exactly(req.body.session.sessionId);
      alexa.userId.should.be.exactly(req.body.session.user.userId);
      alexa.types.should.be.exactly('LAUNCH_REQUEST');

      alexa.response('Launch Response', {
        title: 'Launch Card Title',
        subtitle: 'Launch Card Subtitle',
        content: 'Launch Card Content'
      }, false, function (error, res) {
        if(error) {
          return done(error);
        }
        // Testing..
        res.version.should.be.exactly(req.body.version);
        res.sessionAttributes.should.eql(req.body.session.attributes);
        res.response.outputSpeech.text.should.be.exactly('Launch Response');
        res.response.shouldEndSession.should.be.false;
        done();
      });
    });
  });

  describe('Echo Intent Request', function () {
    it('should successfully construct a valid intent response', function (done) {
      var req = {
        body: {
          "version": "1.0",
          "session": {
            "new": false,
            "sessionId": "amzn1.echo-api.session.abeee1a7-aee0-41e6-8192-e6faaed9f5ef",
            "attributes": {
              "supportedHoroscopePeriods": {
                "daily": true,
                "weekly": false,
                "monthly": false
              }
            },
            "user": {
              "userId": "amzn1.account.AM3B227HF3FAM1B261HK7FFM3A2"
            }
          },
          "request": {
            "type": "IntentRequest",
            "requestId": " amzn1.echo-api.request.6919844a-733e-4e89-893a-fdcb77e2ef0d",
            "intent": {
              "name": "GetZodiacHoroscopeIntent",
              "slots": {
                "ZodiacSign": {
                  "name": "ZodiacSign",
                  "value": "virgo"
                }
              }
            }
          }
        }
      };

      alexa.intentRequest(req.body);
      // Testing..
      alexa.sessionId.should.be.exactly(req.body.session.sessionId);
      alexa.userId.should.be.exactly(req.body.session.user.userId);
      alexa.intentName.should.be.exactly(req.body.request.intent.name);
      alexa.slots.should.eql(req.body.request.intent.slots);
      alexa.types.should.be.exactly('INTENT_REQUEST');

      alexa.response('Intent Response', {
        title: 'Intent Card Title',
        subtitle: 'Intent Card Subtitle',
        content: 'Intent Card Content'
      }, true, function (error, res) {
        if(error) {
          return done(error);
        }
        // Testing..
        res.version.should.be.exactly(req.body.version);
        res.sessionAttributes.should.eql(req.body.session.attributes);
        res.response.outputSpeech.text.should.be.exactly('Intent Response');
        res.response.shouldEndSession.should.be.true;
        done();
      });
    });
  });

  describe('Echo Session Ended Request', function () {
    it('should successfully construct a valid session ended response', function (done) {
      var req = {
        body: {
          "version": "1.0",
          "session": {
            "new": false,
            "sessionId": "amzn1.echo-api.session.abeee1a7-aee0-41e6-8192-e6faaed9f5ef",
            "attributes": {
              "supportedHoroscopePeriods": {
                "daily": true,
                "weekly": false,
                "monthly": false
              }
            },
            "user": {
              "userId": "amzn1.account.AM3B227HF3FAM1B261HK7FFM3A2"
            }
          },
          "request": {
            "type": "SessionEndedRequest",
            "requestId": "amzn1.echo-api.request.d8c37cd6-0e1c-458e-8877-5bb4160bf1e1",
            "reason": "USER_INITIATED"
          }
        }
      };

      alexa.sessionEndedRequest(req.body);

      // Testing..
      alexa.sessionId.should.be.exactly(req.body.session.sessionId);
      alexa.userId.should.be.exactly(req.body.session.user.userId);
      alexa.types.should.be.exactly('SESSION_ENDED_REQUEST');

      alexa.response(function (error, res) {
        if(error) {
          return done(error);
        }
        // Testing..
        res.version.should.be.exactly(req.body.version);
        done();
      });
    });
  });
});