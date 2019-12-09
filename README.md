# DecentralizedBiddingSystem
The repository contains the code for decentralized bidding application built using blockchain technologies.

Steps to run the application:

Installations:

Node version 8.9.0 should be installed using nvm which is node version manager. The node version manager makes it easy to switch between the versions for Node.

After installing Node 8.9.0, all the dependencies can be installed using the command:
npm install
Note: Make sure that the present working directory is same where the file package.json file is located.

Once all the dependencies are installed, following command needs to be executed for migrating the contract after navigating to ‘contracts’ directory:
truffle migrate --reset

The lite-server can now be started using the following command to access the user interface from the url: http://localhost:3000

npm run dev

Once the server is up and running, the user interface is successfully loaded!!!


