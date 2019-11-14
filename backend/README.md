# Task Management System
Following project is the Task Management System for user to manage the tasks.


Step for installation :

###Prerequisite
  - First We need to install Postgresql. For installation refer the given link :
     https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-16-04
     
  - After installation create role in db. 
    For creating role use the following command:
      
      $ `sudo -u postgres createuser --interactive` 
      
      The script will prompt you with some choices and, based on your responses, execute the correct Postgres         
      commands to create a user to your specifications.
      
      So, the input we would provide 
      
      Enter name of role to add: admin
      Shall the new role be a superuser? (y/n) y
      
      Set user password to `123456`. 
      (Or you can change it to anything else and change it config/config.json file respectively).
  
  - After creating role add new database to named "mydb"
    (Or you can change it to anything else and change it config/config.json file respectively)..

- Install node (v10.0.0).

###Installing Dependencies :
- To install all dependencies you need to run the following command `npm install`

###Start Server :
  - Run command  `npm run start` for starting the Server .

##Project Description
The server would be running on port 8000.
Endpoints for users :
	- To fetch users  - GET  request on /users.
	- To create new user  - POST request on /users   with user details in body.
	- To update existing user  - PUT request on /users with  param  user id.
Endpoints for Tasks :
	- To fetch list of tasks for task - GET request on /tasks with user user_id as query param.
	To create new task for task - POST request on /tasks with task details in body.
	To update existing task  - PUT request on /tasks with  param task id.
	To remove exsting task - DELETE request on /tasks with param task id.
