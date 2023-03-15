'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();

app.use(bodyParser.urlencoded({extended : true}));

app.get('/',function (req,res) {
	res.sendFile(__dirname + "/index.html");
});

app.post('/',function (req,res) {

	const mainURL = 'api.openweathermap.org/data/2.5/weather?'
	const query = req.body.cityName;
	const apiKey = 'c06cd128db312dced1a6d07dc2a9db45';
	const units = 'imperial';

	const url = `https://${mainURL}q=${query}&appid=${apiKey}&units=${units}`;

	https.get(url,function (response) {
		console.log(response.statusCode)

		response.on('data',function (data) {
			const weatherData = JSON.parse(data);
			const temp = weatherData.main.temp;
			const discription = weatherData.weather[0].description;
			const icon = weatherData.weather[0].icon;
			const imgURL = `https://openweathermap.org/img/wn/${icon}@2x.png`

			res.write(`<h1>Weather App</h1>`);
			res.write(`<h2>The temperature is in ${query} ${temp} degree celcius</h2>`);
			res.write(`<h3>The weather is currently ${discription}</h3>`);
			res.write(`<img src="${imgURL}" alt="weather image">`)

			res.send()
		})
	})
})



app.listen(2000,function () {
	console.log('Server is running on port 2000')
});




