Postaway – Backend Service

Postaway is a backend application built with Node.js that follows a microservices-inspired modular architecture. It provides core social media features such as user management, posts, likes, comments, friends, and OTP-based authentication, with support for Redis, MongoDB, JWT authentication, file uploads, and email services.

Features
User authentication with JWT
OTP generation and verification (Email-based)
    Secure password hashing using bcrypt
    CRUD operations for:
        Users
        Posts
        Likes
        Comments
        Friends
    Image upload support using Multer
    Centralized error handling
    MongoDB integration using Mongoose
    Redis integration for caching / OTP storage
    Scalable folder structure for microservice-style development

Project Structure
src
├── config
│   ├── config.mongoose.js   # MongoDB connection setup
│   └── redis.js             # Redis client configuration
│
├── errorHanding
│   └── error.handling.js    # Global error handling logic
│
├── features
│   ├── comment              # Comment-related APIs
│   ├── friends              # Friend request & management APIs
│   ├── like                 # Like-related APIs
│   ├── OTP                  # OTP generation & verification
│   ├── posts                # Post-related APIs
│   └── user                 # User authentication & profile APIs
│
├── hash
│   └── passHash.js          # Password hashing & comparison
│
├── middlewares
│   ├── fileUpload.js        # Multer-based file upload middleware
│   ├── jwtAuth.js           # JWT authentication middleware
│   └── sendMail.js          # Email service for sending OTP
│
├── upload                   # Stores uploaded images
│
├── .env                     # Environment variables
├── index.js                 # Application entry point
└── server.js                # Server configuration & startup

Password Hashing
File: src/hash/passHash.js
This module uses bcrypt for secure password handling:
    bcrypt.hash() – to hash user passwords before storing
    bcrypt.compare() – to verify passwords during login


Email Service
    Implemented in sendMail.js
    Used to send OTPs to users during registration or login
    Can be configured with Gmail provider

File Uploads
    Image uploads are handled using Multer
    Uploaded files are stored in the upload/ directory
    Commonly used for  post images

Database
MongoDB
    Configured in config.mongoose.js
    Used as the primary database for storing application data
Redis
    Configured in redis.js
    Used for caching and OTP storage

Environment Variables
DB_URL=your_mongodb_connection_string
JWT_KEY=your_jwt_secret
REDIS_URL=redis://127.0.0.1:6379
EMAIL_USER=your_email
EMAIL_PASS=your_email_app_password

Running the Project
npm install
npm start

Tech Stack
    Node.js
    Express.js
    MongoDB + Mongoose
    Redis
    JWT
    bcrypt
    Multer
    Nodemailer

Author
Rahul Bhogal
Backend Developer | Node.js | MongoDB | Security-focused APIs