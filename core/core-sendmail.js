'use strict';

exports.init = function(noderplate) {
  var sendmail   = {};
  var nodemailer = noderplate.imports.nodemailer;
  var Q = noderplate.imports.Q;

  var smtpTransport = nodemailer.createTransport('SMTP',{
    service: noderplate.config.sendmail.service,
    auth: {
      user: noderplate.config.sendmail.user,
      pass: noderplate.config.sendmail.pass
    }
  });

  sendmail.send = function(options) {
    var dfd = Q.defer();

    smtpTransport.sendMail(options, function(error, response){
      if (error) {
        return dfd.reject(error);
      }

      return dfd.resolve('Message sent');
    });

    return dfd.promise;
  };

  return sendmail;
};