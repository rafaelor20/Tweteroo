import express from "express"

const PORT = 5000;

let tweet = {
    "username": "",
    "tweet": ""
}

let tweetsElem = {
	"username": "",
	"avatar": "",
	"tweet": ""
};

const users = [];
const tweets = [];

const server = express();
server.use(express.json());

server.post("/sign-up",(req, res) => {
	const user = req.body;
	users.push(user);
	console.log(users);
	res.send();
})



server.listen(PORT, () => console.log(`Este servidor roda na porta: ${PORT}`));