import express from "express"

const PORT = 5000;

const users = [];
const tweets = [];

const server = express();
server.use(express.json());

server.post("/sign-up", (req, res) => {
	const user = req.body;
	if (validSignUp(user)) {
		users.push(user);
		res.send("OK");
	} else {
		res.send(400);
	}
})

function validSignUp(user) {
	let ok = false;
	if ((typeof user.username) === "string" && (typeof user.avatar) !== "string"){
		if(user.username.length>10 && user.avatar.length>10){
			ok = true;
		}
	}
	return ok;
}

server.post("/tweets", (req, res) => {
	const tweet = req.body;
	const user = userLogged(tweet)
	if (user !== null) {
		tweets.push(
			{
				username: user.username,
				avatar: user.avatar,
				tweet: tweet.tweet
			}
		);
		res.send("OK");
	} else {
		res.send("UNAUTHORIZED");
	}
})

function userLogged(tweet) {
	const username = tweet.username;
	for (const element of users) {
		if (element.username === username) {
			return element;
		}
	}
	return null;
}

server.get("/tweets", (req, res) => {
	if (tweets.length > 10) {
		const lastTweets = tweets.slice(-10);
		res.send(lastTweets);
	} else {
		res.send(tweets);
	}
})

server.listen(PORT, () => console.log(`Este servidor roda na porta: ${PORT}`));

/*
thunder client:
{
	"username": "rafael",
	"avatar": "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg"
}

{
  "username": "rafael",
  "tweet": "eu amo o hub"
}

*/