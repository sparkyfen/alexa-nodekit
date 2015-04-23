'use strict';

exports.launchRequest = function (req) {
  this.version = req.version;
  this.sessionId = req.session.sessionId;
  this.userId = req.session.user.userId || '';
  this.types = 'LAUNCH_REQUEST';
};

exports.intentRequest = function (req) {
  this.sessionId = req.session.sessionId;
  this.attributes = req.session.attributes;
  this.userId = req.session.user.userId || '';
  this.intentName = req.request.intent.name;
  this.slots = req.request.intent.slots;
  this.types = 'INTENT_REQUEST';
};

exports.sessionEndedRequest = function (req) {
  this.sessionId = req.session.new ? req.session.sessionId : this.sessionId;
  this.attributes = req.session.attributes;
  this.userId = req.session.user.userId || '';
  this.endReason = req.request.reason;
  this.types = 'SESSION_ENDED_REQUEST';
};

exports.response = function (speech, card, endSession, callback) {
  if(this.types === 'SESSION_ENDED_REQUEST') {
    callback = speech;
    return callback(null, {version: this.version});
  }
  if(!speech) {
    return callback('Missing speech text.');
  }
  if(typeof(speech) === 'number') {
    speech = speech.toString();
  }
  if(typeof(speech) !== 'string') {
    return callback('Invalid speech text.');
  }
  if(!card) {
    return callback('Missing card data.');
  }
  if(typeof(card) !== 'object') {
    return callback('Invalid card object.');
  }
  if(!card.title) {
    return callback('Missing card title.');
  }
  if(!card.subtitle) {
    return callback('Missing card subtitle');
  }
  if(!card.content) {
    return callback('Missing card content');
  }
  if(typeof(endSession) !== 'boolean') {
    return callback('Invalid end session value.');
  }
  return callback(null, {
    version: this.version,
    sessionAttributes: this.attributes || {},
    response: {
      outputSpeech: {
        type: 'PlainText',
        text: speech
      },
      card: {
        type: 'Simple',
        title: card.title,
        subtitle: card.subtitle,
        content: card.content
      },
      shouldEndSession: endSession
    }
  });
};