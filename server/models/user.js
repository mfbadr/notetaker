'use strict';

var bcrypt     = require('bcrypt'),
    request    = require('request'),
    path       = require('path'),
    pg         = require('../postgres/manager'),
    AWS        = require('aws-sdk');


function User(obj){
  this.username = obj.username;
}

User.login = function(obj, cb){
  pg.query('select * from users where username = $1 limit 1', [obj.username], function(err, results){
    if(results.rows[0]){
      var user = results.rows[0],
          isGood = bcrypt.compareSync(obj.password, user.password);
      if(!isGood){
        return cb();
      }
      console.log('ISGOOD = ', isGood);
      cb(user);
    }else{
      cb();
    }
  });
};

User.register = function(obj, cb){
  var user = new User(obj);
  avatarURL(obj.avatar, function(url, file){
    user.avatar = url;
    user.password = bcrypt.hashSync(obj.password, 10);
    console.log('The hashed password is', user.password);
    pg.query('insert into users (username, password, avatar) values ($1, $2, $3) returning id', [user.username, user.password, user.avatar], function(err, results){
      if(!err){
        download(obj.avatar, file, cb);
      }else{
        cb(err);
        console.log('err: ', err);
      }
    });
  });
};

function download(url, file, cb){
  var s3   = new AWS.S3();
  request({url: url, encoding: null}, function(err, response, body){
    var params = {Bucket: process.env.AWS_BUCKET, Key: file, Body: body, ACL: 'public-read'};
    s3.putObject(params, cb);
  });
}

function avatarURL(url, cb){
  var //s3   = new AWS.S3(),
      ext  = path.extname(url);
  require('crypto').randomBytes(48, function(ex, bg){
    var token = bg.toString('hex'),
    file = token + '.avatar' + ext,
    avatar = 'https://s3.amazonaws.com/' + process.env.AWS_BUCKET + '/' + file;
    console.log('AVATAR: ', avatar);
    console.log('file: ', file);
    cb(avatar, file);
  });
}

module.exports = User;

