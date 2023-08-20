# Next.js + MongoDB + NextAuth.js

This is a simple Next.js application that allows you to make posts to MongoDB and shows to other users with private posts option.

## Requirements

* Node.js v16 or higher
* npm v7 or higher

## Setup

1. Clone this repository
2. Install the dependencies

`npm install`

3. Set up the environment variables
`cp .env.example .env`


Edit the `.env` file and set the following values:

`GOOGLE_ID=YOUR_GOOGLE_ID`
`GOOGLE_SECRET=YOUR_GOOGLE_SECRET`
`MONGODB_URI=YOUR_MONGODB_URI`
`NEXT_PUBLIC_WEB_URL=YOUR_WEB_URL`
`NEXTAUTH_URL=YOUR_NEXTAUTH_URL`
`NEXTAUTH_SECRET=YOUR_NEXTAUTH_SECRET`

4. Run the development server

`npm run dev`

The application will be available at http://localhost:3000.

## Usage
To make a post, simply fill out the form on the home page and click the "Submit" button. The post will be saved to MongoDB and displayed on the page.

## Authentication
The application is authenticated using NextAuth.js. To sign in, simply click the "Sign In" button on the home page and enter your Google credentials.

## Debugging
If you have any problems with the application, please open an issue on the GitHub repository.