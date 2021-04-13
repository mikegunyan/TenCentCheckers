# Checkers

  ## Before we begin
  ### Create .env file and assign the following variable
  SESSION_SECRET=??

  ### Install dependencies
  npm install

  ### Fix express
  -Navigate to node_modules/express/lib/application.js
  -replace all 'views' instances with 'public'

  ### Seed Database
  npm run seed

  ### start webpack and server in seperate terminals
  npm run build
  npm start
