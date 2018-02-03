var nodemailer = require('nodemailer');
var timerId;
var http = require('http');


var transporter = nodemailer.createTransport("SMTP",{
  service: 'Gmail',
  auth: {
    user: '*************',
    pass: '************'
  }
});

module.exports.sendEmail = function(user_email,user_password) {  

  if (timerId) return;
 
  timerId = setTimeout(function() {
    clearTimeout(timerId);
    timerId = null;
  }, 10000);
 
  console.log('Sendig an Email..');
 
  var mailOptions = {
    from: 'Vatsal Shah <vatsalshah2210@gmail.com>',
    to: user_email,
    subject: 'Tennis account password reset',
    html:   'Hello,<br/><br/>We received a request to reset the password associated with this e-mail address. <br/><br/>Your Password is : <b>'+user_password+'</b>. <br/><br/>If you do not want to change your password or did not request this, please ignore and delete this message.<br/><br/> Thank you,<br/>Vatsal Shah'
  };
 
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Message sent');
    }
  });
}
