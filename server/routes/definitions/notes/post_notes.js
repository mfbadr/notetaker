'use strict';

var Joi  = require('joi'),
    Note = require('../../../models/note');

module.exports = {
  description: 'Register a User',
  tags:['users'],
  validate: {
    payload: {
      body: Joi.string().min(3).required(),
      title: Joi.string().min(3).required(),
      tags: Joi.string()
    }
  },
  handler: function(request, reply){
    Note.create(request.auth.credentials, request.payload, function(err, note){
      reply().code(err ? 400 : 200);
    });
  }
};
