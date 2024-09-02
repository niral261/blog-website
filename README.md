# Blog-app
Blog Web App

Welcome to the Blog Web App! This application allows users to create, read, update, and delete blog posts. Built using the MERN stack (MongoDB, Express.js, React.js, Node.js), it provides a robust and scalable solution for managing blog content.


# Table of Contents

•	Features

•	Technologies Used

•	Installation

•	Usage

•	Project Structure

•	API Endpoints

•	Screenshots

•	Contributing

•	License


# Features

•	User Authentication: Sign up, log in, and log out functionalities.

•	Create, Read, Update, and Delete (CRUD) operations for blog posts.

•	Responsive design for mobile and desktop devices.

•	Rich text editor for writing blog posts.

•	Comment system for readers to engage with blog content.

•	Tagging system for categorizing blog posts.

•	Recommended topics based on user interests.


# Technologies Used

•	Frontend:

  o	React.js
  
  o	Material UI (for UI components)
  
  o	Axios (for HTTP requests)

•	Backend:

  o	Node.js
  
  o	Express.js
  
  o	MongoDB (with Mongoose for object modeling)

•	Authentication:

  o	JSON Web Tokens (JWT)
  
  o	BCrypt (for password hashing)


# Installation

To run this project locally, follow these steps:

1.	Clone the repository:
 
  git clone https://github.com/niral261/Blog-app/tree/master
  
  cd Blog-app
  

2.	Install dependencies for both frontend and backend:
 
  In the root directory (for backend)
  
   npm install
  
  Navigate to the client directory
  
   cd client
   
   npm install
   
 
3.	Set up environment variables: Create a .env file in the root directory and add the following:
 
  DB_USERNAME
  
  DB_PASSWORD
  
  ACCESS_SECRET_KEY
  
  REQUEST_SECRET_KEY


4.	Run the application:
 
  Start the backend server
  
  npm run server
  
  Start the frontend development server
  
  cd client
  
  npm start
  
 
The application should now be running on http://localhost:3000.


# Usage

•	Home Page: Displays a list of blog posts and recommended topics.

•	Create Post: Allows authenticated users to write and publish new blog posts.

•	Post Details: Displays the full content of a blog post along with comments.

•	Edit Post: Allows authors to edit their blog posts.

•	Delete Post: Allows authors to delete their blog posts.

•	User Authentication: Sign up, log in, and log out functionalities.


# Project Structure

Blog-app/

├── client/                   # Frontend (React.js)

│   ├── build/

│   ├── node_modules/

│   ├── public/

│   ├── src/

│   │   ├── components/       # React components

│   │   ├── pages/            # React pages

│   │   ├── redux/            # Redux actions and reducers

│   │   └── App.js

│   └── package.json

├── controller/               # Backend controllers


├── database/                 # Database connection

├── model/                    # Mongoose models

├── node_modules/

├── routes/                   # Express routes

├── utils/                    # Utility functions

├── .env                      # Environment variables

├── .gitignore

├── package-lock.json

├── package.json

├── README.md

└── server.js                 # Entry point for the backend


# API Endpoints

Auth

  •	POST /api/auth/register - Register a new user
  
  •	POST /api/auth/login - Log in a user
  
  •	GET /api/auth/logout - Log out a user

Posts

  •	GET /api/posts - Get all posts
  
  •	POST /api/posts - Create a new post
  
  •	GET /api/posts/:id - Get a post by ID
  
  •	PUT /api/posts/:id - Update a post by ID
  
  •	DELETE /api/posts/:id - Delete a post by ID

Comments

  •	POST /api/posts/:id/comments - Add a comment to a post
  
  •	DELETE /api/posts/:id/comments/:commentId - Delete a comment


# Screenshots

1. Home Page

 ![image](https://github.com/niral261/Blog-app/assets/102373223/882c831e-bd25-4e05-a197-d0a26ff26b7a)

2. Post Page
 
 ![image](https://github.com/niral261/Blog-app/assets/102373223/f5c87e37-35e1-46f8-81f6-cead0a4254d8)

3. Create Post
 
 ![image](https://github.com/niral261/Blog-app/assets/102373223/eda42388-a93c-43d3-9c6b-90abbf27f2d5)


# Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.


# License

This project is licensed under the MIT License.


