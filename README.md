# E-commerce-App-In-Node.js

A web-app for E-commerce online shopping


Technology Stack:

  1.) Mongodb for database
  
      Schemas can be found in src/models
      
      connection details in src/db/mongoose.js
      
      
  2.) Node.js with express.js as backend with Mongoose
  
       Database models : src/models
        
          Two Models: User and Product
          
       Controllers : src/controllers
       
       Middleware for Auth : src/middleware/auth.js
       
       Routers for users and products : src/routers
       
       Environment Variables : config/dev.env
       
       
 Get Started with app:
 
    1.) git clone https://github.com/rohitnawale/E-commerce-App-In-Node.js
 
    2.) npm install
 
    3.)Go to the root folder and run the command
    
      development server : npm run dev
      
      production server :  npm start
      
      
 You can access the api using tools like Postman or any other similar tool at localhost:3000/api/
      
