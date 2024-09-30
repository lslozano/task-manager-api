# Task Manager API

A RESTful API project built with Node.js, Express, and MongoDB, allowing users to register, log in, manage tasks, and interact between each other with comments. The API is designed to be modular, with a clear separation of concerns between authentication, user management, task management, and comments.

## Table of Contents

- [Project Overview](#project-overview)
- [Demo](#demo)
- [Design Patterns Applied](#design-patterns-applied)
- [Followed Programming Principles](#followed-programming-principles)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [User Management](#user-management)
  - [Task Management](#task-management)
  - [Comment Management](#comment-management)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [License](#license)

## Project Overview

The Task Manager API allows users to manage tasks and comments. Each user can create, update, and delete tasks and comments. The API is designed with scalability in mind, and it can serve as the backend for task management applications, team collaboration tools, or any project management software.

## Demo
https://youtu.be/Vf-7YEmbjH0

## Design Patterns Applied

In order to have a project with a solid foundation that is scalable, clear, and easily understandable to other developers, certain Design Patterns were implemented. The implemented patterns are as follows:

- **MVC (Model-View-Controller)**: Applied for structuring the application, separating data models (Model), business logic (Controller), and user interaction (View). Overall, this helps with **decoupling logic**, making each component responsible for a specific layer of the application as follows:

  - **Models**: Clear models for data, like User, Comment, and Task. These handle the database schema and related logic.
  - **Controllers**: Controllers like `userController` and `taskController` manage business logic and handle requests/responses. They mediate between the user inputs (requests) and the services/models.
  - **Views**: While we have not an explicit "view" as of now, the API responses (JSON data) represent the "view" part in a broader sense.

- **Service Layer**: Used to abstract business logic from the controllers, making the codebase more modular and easier to test. Services like `userService`, `commentService` and `taskService`, etc., encapsulate business logic related to each domain (users, tasks, and comments). This pattern allows to decouple the business logic from controllers and models. It ensures that complex operations on the models are managed by services, keeping the controllers thin and focused on HTTP request/response handling.

- **Middleware Pattern**: In Node.js/Express, middleware is a fundamental pattern. Here this pattern is being used to do things like authenticate the user token and validate inputs with functions like `authenticateToken` and `userInputValidation`. These middleware functions handle cross-cutting concerns like authentication and validation, keeping the main logic clean.

## Followed Programming Principles

- **SOLID Principles**:
  - **Single Responsibility Principle**: Each file, service, controller, model, and method, has a clear, focused responsibility.
  - **Open/Closed Principle**: Classes are open for extension but closed for modification, ensuring flexibility and avoiding changes to existing code.
- **DRY (Don't Repeat Yourself)**: Shared logic is abstracted into reusable services and middleware.
- **KIS (Keep It Simple)**: Code is written with simplicity in mind, avoiding unnecessary complexity, and sticking with names and a structure that is easily understandable at first glance.
- **YAGNI (You Aren't Going To Need It)**: Only features or code that are actually required are implemented, avoiding over-engineering.

By following the aforementioned principles the result is a project that is easy to understand, with clear separations, a solid foundation, and scalable.

## Features

- User Registration and Authentication (JWT-based)
- Profile Management: CRUD operations for users
- Task Management: CRUD operations for tasks
- Comment Management: CRUD operations for comments on tasks
- Middleware for validation and authentications
- Error handling and logging
- Modular and maintainable code structure

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB (Mongoose for ORM)
- **Authentication**: JWT (JSON Web Tokens)
- **Testing**: Jest
- **Validation**: Custom Middleware
- **Error Handling**: Custom error classes, centralized error handler middleware

## Getting Started

### Prerequisites

To run this project locally, you need to have the following installed:

- [Node.js](https://nodejs.org/en)
- [MongoDB](https://www.mongodb.com/try/download/community) (or use MongoDB Atlas)
- [Postman](https://www.postman.com/) (optional, for API testing)

### Installation

1.  **Clone the repository:**
    - Go to https://github.com/lslozano/task-manager-api
    - Hit `clone` and follow instructions
    - Or you can run the following command in your terminal in the desired folder:
      - `git clone https://github.com/your-username/task-manager-api.git`
      - Then run `cd task-manager-api`
2.  **Install dependencies:**

    Once your at the project folder run `npm install` to install all of the dependencies.

3.  **Set up MongoDB**:

    - If using a local MongoDB server, ensure it’s running.
    - If using MongoDB Atlas, create a database cluster and grab the connection string.

### Environment Variables

Create a `.env` file in the root directory of the project and include the following:

    PORT=3000
    DATABASE_URL=your-mongo-connection-string
    SECRET_KEY=your_jwt_secret
    ENVIRONMENT="dev"

### Running the API

Run the following command at your terminal: `npm start`

The API should now be running on `http://localhost:3000`.

## API Endpoints

### Home

- **GET** `/api/v1/` - Gets the Home view

### Authentication

- **GET** `/api/v1/register` - Gets the Register view
- **POST** `/api/v1/register` - Register a new user
- **GET** `/api/v1/login` - Gets the Login view
- **POST** `/api/v1/login` - Log in a user
- **POST** `/api/v1/logout` - Log out a user

### User Management

- **GET** `/api/v1/profile` - Get current user's profile
- **GET** `/api/v1/profile/tasks` - Get current user's profile assigned tasks
- **GET** `/api/v1/profile/comments` - Get current user's profile published comments
- **PUT** `/api/v1/profile` - Update user profile
- **DELETE** `/api/v1/profile` - Delete user profile

### Task Management

- **GET** `/api/v1/tasks` - Get all tasks
- **POST** `/api/v1/tasks` - Create a new task
- **GET** `/api/v1/tasks/:taskId` - Get a specific task by ID
- **PUT** `/api/v1/tasks/:taskId` - Update a task
- **DELETE** `/api/v1/tasks/:taskId` - Delete a task

### Comment Management

- **GET** `/api/v1/comments` - Get all comments
- **GET** `/api/v1/comments/:commentId` - Get a specific comment
- **POST** `/api/v1/tasks/:taskId/comment` - Add a comment to a task
- **PUT** `/api/v1/tasks/:taskId/comment/:commentId` - Update a comment
- **DELETE** `/api/v1/tasks/:taskId/comment/:commentId` - Delete a comment

## API Documentation

The API Documentation can be reviewed [here](https://documenter.getpostman.com/view/11121286/2sAXqzVxxP).

## Testing

To run the test suite:

`npm run test`

You can run specific tests for unit inside the `tests/` folder, using the following command:

`npm run test test-file-path`

## Roadmap

### v2 - Add administrator functionality

- Role-based access control (RBAC) to distinguish between regular users and administrators.
- Admin-specific features:
  - Ability to edit and delete any user's tasks or comment.
  - Manage users profiles (delete accounts, reset passwords).

### v3 - Add Frontend

- Build a user-friendly frontend using modern frameworks like React or Vue.js.
- Integrate the frontend with the existing API.
- Create responsive layouts for both desktop and mobile.
- Frontend features:
  - User authentication (login/register) interface.
  - Profile management and editing capabilities.
  - Task management dashboard.
  - Comment management dashboard.

### v4 - Add Unit Tests

- Implement unit tests for API routes and services using tools like Jest or Mocha.
- Ensure high test coverage for critical functionalities (authentication, task management, etc.).

## License

This project is licensed under the MIT License.

## Contact

If you'd like to get in touch, feel free to reach my out at my LinkedIn profile [lslozano](https://www.linkedin.com/in/lslozano/).
