'use strict';
const express = require('express');
const translate = require('google-translate-api');
const app = express();
const port = process.env.PORT || 4568;

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

const server = app.listen(port,()=>{
	console.log(`server started at port ${port}`);
});

const io = require('socket.io')(server);
io.on('connection', function(socket){
  console.log('a user connected');
});

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

io.on('connection', function(socket) {
  socket.on('input', (texts) => {
  	console.log(texts)
	translate(texts, {to: 'en'}).then(res => {
	    console.log(res.text);
	    console.log('Message: ' + res.text);
		socket.emit('reply', res.text);
	    //=> I speak English
	    console.log(res.from.language.iso);
	    //=> nl
	}).catch(err => {
	    console.error(err);
	});
  });
});