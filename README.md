# Node.js & MongoDB Learning Project

A basic project developed for learning Node.js and MongoDB. This project includes features like account creation, user login, posting thoughts, liking/unliking posts, and editing posts. It's designed to help understand the core concepts of backend development with Node.js and MongoDB.

## Overview

This project is a simple web application where users can create an account, log in, and share their thoughts by creating posts. Users can also like or unlike posts and edit their own posts. The primary goal is to provide a hands-on experience with Node.js and MongoDB, focusing on user authentication, CRUD operations, and interaction with a NoSQL database.

## Features

- **User Authentication**: Account creation and login functionality.
- **Create Post**: Users can create a new post to share their thoughts.
- **Like/Unlike Post**: Users can like or unlike posts.
- **Edit Post**: Users can edit their own posts.

## Technologies Used

- **Node.js**: JavaScript runtime for building the server-side application.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing user and post data.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB and Node.js.
- **EJS**: Embedded JavaScript templating engine for rendering views.
- **Passport.js**: Middleware for user authentication.

## Installation

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/yourusername/node-mongodb-learning-project.git
    ```

2. Navigate to the project directory:

    ```bash
    cd node-mongodb-learning-project
    ```

3. Install the necessary dependencies:

    ```bash
    npm install
    ```

4. Set up your MongoDB database:

    - Ensure MongoDB is installed and running on your local machine or connect to a MongoDB Atlas cluster.
    - Create a `.env` file in the root of your project and add your MongoDB URI and other environment variables:

      ```env
      MONGODB_URI=mongodb://localhost:27017/node-mongodb-learning
      SESSION_SECRET=yourSessionSecret
      ```

5. Start the application:

    ```bash
    npm start
    ```

6. Open your browser and go to `http://localhost:3000` to view the application.

## Usage

- **Create an Account**: Register a new account by providing a username and password.
- **Login**: Log in with your account credentials.
- **Create a Post**: After logging in, navigate to the "Create Post" page, enter your thoughts, and submit the form to create a new post.
- **Like/Unlike a Post**: Click the like button on a post to like or unlike it.
- **Edit a Post**: Click the edit button on your post, modify the content, and submit the form to update it.




