'use strict';

/*
var bcrypt     = require('bcrypt'),
    request    = require('request'),
    path       = require('path'),
    AWS        = require('aws-sdk'),
 */
var User       = null;


//User.encrypt = function(){
  //this.password = bcrypt.hashSync(this.password, 10);
//};

/* using aws.s3 and request to download and image
  var s3   = new AWS.S3(),
      url  = this.avatar,
      ext  = path.extname(this.avatar),
      file = this._id + '.avatar' + ext;

  this.avatar = 'https://s3.amazonaws.com/' + process.env.AWS_BUCKET + '/' + file;

    var params = {Bucket: process.env.AWS_BUCKET, Key: file, Body: body, ACL: 'public-read'};
    s3.putObject(params, cb);
*/

module.exports = User;
