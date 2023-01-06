import express from "express"

const user = {
	"username": '', 
	"avatar": "" 
}

const tweet = {
    "username": "",
    "tweet": ""
}


const tweetsElem = {
		"username": "",
		"avatar": "",
		"tweet": ""
	};

const tweets = [];

const server = express();




server.listen(5000);