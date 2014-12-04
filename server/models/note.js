'use strict';

var pg         = require('../postgres/manager')
    ;


function Note(obj){
  this.title = obj.title;
  this.body = obj.body;
}

Note.create = function(user, obj, cb){
  pg.query('select add+note($1, $2, $3, $3)', [user.id, obj.title, obj.body, obj.tags], function(err, results){
    console.log(err, results);
    cb();
  });
};

module.exports = Note;

