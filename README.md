# Aref

## Introduction

Aref is an online platform dedicated to classical Arabic language enthusiasts. It is a dynamic social media website that features an extensive library of Arabic books. This platform aims to connect individuals interested in the richness of Arabic literature, providing a space to share interests, articles, and insights on literary works.

## Technologies

- **Frontend:** React
- **Backend:** Node.js ,Express.js
- **Database:** MongoDB
- **Styling:** CSS

## Features

### Extensive Library

1. **Free Books Collection:**
   - Users can borrow and view book content.

2. **Premium Books Collection:**
   - Offers premium books available for purchase.

3. **Book Management:**
   - Filter books by category, author ,price, rate and also by user's interests.
   - Search for books by title.
   - Sort books by price and rate.
   - Rate books from 1 to 5.

### Home Page
   - Share and engage with others's articles via react or comment.
   - -user can post article
   - -user can access others's profiles

### User Profile
   - Create and update personal profile , including profile photo,cover photo and user's interests
   - Follow other users.
## Demo    
## Prerequisites
    - Node.js installed on your machine
    - MongoDB Atlas set up   
## Configration

1. **Install backend dependencies:**

   ```bash
   cd Back-End
   npm install

2. **Install frontend dependencies:**

   ```bash
   cd Front-End
   npm install

3. **Create a .env file**
   Create a .env file in the backend directory and add your environment variables:
     
    ```bash
    DBURI=your_mongodb_uri
    PORT=5000
    //cloudinary setup
    cloud_name=your_ cloud_name
    api_key=your_ api_key
    api_secret= your_ api_secret

4. **Running the Application**
   - **Start the backend server:**
      ```bash
      cd Back-End
      npm start

   - **Start the frontend development server:**
      ```bash
      cd Front-End
      npm start


