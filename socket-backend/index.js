const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const port = 3000;
const hostname = '127.0.0.1';

io.on("connection", socket => {
	console.log("New connection!");
	socket.on("login", username => {
			console.log("User: "+username);
	});

	socket.on("chat-message", msg => {
		console.log(msg);
		io.emit("chat-message", msg);
	});
});

server.listen(port, hostname, ()=> console.log("Server running on port "+port))
