# clio-exercise

This is my submission for the exercise described in taxonomy.md.

There is definetliy a lot of things i would have improved if i had more time, but i have already used a little longer than the given 3 hours.

For example:
The height function is very ineffective
I think nodes can set one of their subchildren as their parent, which is not what we want
Request validation (body and parameters)
Better error handling

# setup

Make sure you have npm installed on your machine.

Clone the repository and run npm install

Install and run mongodb on port 27017

With homebrew:

brew tap mongodb/brew
brew install mongodb-community@5.0
brew services start mongodb-community@5.0 (defaults to port 27017)

Now start the server with

npm start

# routes

POST /node/:parentNodeID - create new node
body: {
employeeName,
employeeType,
managingDepartment,
strongestLanguage
}

GET /node/:nodeID/children - get all children of node

PUT /node/:nodeID/parent - set new parent of node
body: {
parentNodeID
}

GET /nodes - get all nodes as a list
