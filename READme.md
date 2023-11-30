## TWEETEROO

This project is a simple Twitter clone API built with Node.js and Express. It allows users to post tweets and retrieve them.

## Features

- Post a new tweet
- Get all tweets
- Get tweets from a specific user

## API Endpoints

- `POST /tweets`: Post a new tweet. The request body should contain a `username` and `tweet` field.
- `GET /tweets`: Get the last 10 tweets.
- `GET /tweets/:username`: Get all tweets from a specific user.

## Setup

1. Clone the repository
2. Run `npm install` to install dependencies
3. Start the server with `npm run start`