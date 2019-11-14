# Task Management System

Task Management System is a react node application. It allows a user to manage the todo tasks.

## Running the application
  - ### Prerequisites
    You must have following software/binaries installed

    - Stable version of `node`
    - Stable version of `postgres`

  - ### Environment Setup
    - Check (and modify if needed) the postgres database configuration in `projectRoot/backend/config/config.json`

  - ### Start Backend
    - cd into `projectRoot/backend`
    - Install dependencies with `npm install` or `yarn`
    
    - Start the development server with `npm start` or `yarn start`
  - Server Would be running on port http://localhost:8000

  - ### Start Frontend
    - cd into `projectRoot/frontend`
    - Install dependencies with `npm install` or `yarn`
    - Start the development server with `npm start` or `yarn start`
  - Server Would be running on port http://localhost:3001

## Project Description
  - The first page is the login page for User to provide his name.
  - Once a valid username is provided, the next page displays task list of logged in user.
  - User can add new task with title, description and the deadline date.
  - Every row in the list has two actions, edit and delete for editing and deleting the tasks respectively.
  - This is a paginated list and displays 10 tasks at a time.
