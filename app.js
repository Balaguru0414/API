'use strict';

const express = require('express');
const bodyparser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();

app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended : true}))

app.get('/',function (req,res) {
	res.sendFile(__dirname + '/signup.html');
});

app.post('/',function (req,res) {
	const firstName = req.body.fName;
	const lastName = req.body.lName;
	const email = req.body.email;

	const data = {
		members : [{
			email_address : email,
			status : 'subscribed',
			merge_fields : {
				FNAME : firstName,
				LNAME : lastName,
			}
		}]
	};

	const jsonData = JSON.stringify(data);

	const url = 'https://us21.api.mailchimp.com/3.0/lists/c76fcb0abe';
	const options = {
		method : 'POST',
		auth : 'Balaguru:b6412a0a171af2cab964f7ecc67bf8a5-us21'
	}

	const request = https.request(url,options,function (response) {

		response.statusCode === 200 
		? res.sendFile(__dirname + '/success.html') 
		: res.sendFile(__dirname + '/failure.html') 

		response.on('data',function (data) {
			console.log(JSON.parse(data))
		})
	});

	request.write(jsonData);
	request.end()
});

app.post('/success',function (req,res) {
	res.redirect('/');
})

app.post('/failure',function (req,res) {
	res.redirect('/');
})

app.listen(8000,function () {
	console.log('Server is running on port 8000')
})


// API Key
// b6412a0a171af2cab964f7ecc67bf8a5-us21

// List id
// c76fcb0abe