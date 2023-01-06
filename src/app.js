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
		res.sendStatus(201);
	} else {
		res.sendStatus(400);
	}
})

function validSignUp(user) {
	let ok = false;
	if (typeof user.username === "string" && typeof user.avatar === "string") {
		if (user.username.length > 0 && user.avatar.length > 0) {
			ok = true;
		}
	}
	return ok;
}

server.post("/tweets", (req, res) => {
	const tweet = {
		username: "",
		tweet: ""
	};
	if (typeof req.headers.user === "string") {
		tweet.username = req.headers.user;
		tweet.tweet = req.body.tweet;
	} else {
		tweet.username = req.body.username;
		tweet.tweet = req.body.tweet;
	}
	let user;
	if (validTweet(tweet)) {
		user = userLogged(tweet);
		if (user !== undefined) {
			tweets.push(
				{
					username: user.username,
					avatar: user.avatar,
					tweet: tweet.tweet
				}
			);
			res.sendStatus(201);
		} else {
			res.status(401).send("UNAUTHORIZED");
		}
	} else {
		res.sendStatus(400);
	}
})

function validTweet(tweet) {
	let ok = false;
	if (typeof tweet.username === "string" && typeof tweet.tweet === "string") {
		if (tweet.username.length > 0 && tweet.tweet.length > 0) {
			ok = true;
		}
	}
	return ok;
}

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

server.get("/tweets/:username", (req, res) => {
	const userName = req.params.username;
	const userTweets = tweets.filter(tweet => tweet.username === userName);
	res.send(userTweets);
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