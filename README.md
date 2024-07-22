# Auth Service

Auth Service is a robust authentication service built with Node.js and Express. It provides user registration, login, profile update, and password change functionalities, utilizing JWT for authentication and Sequelize for database interactions.

## Table of Contents

1. [Features](#features)
2. [Configuration](#configuration)
3. [Usage](#usage)
4. [Contributing](#contributing)

## Features

- User registration
- User login with JWT authentication
- Update user profile
- Change user password
- Secure routes with middleware

## Configuration

  Before running the application, set up your environment variables. Create a `.env` file in the root directory with the following content:
  
  - JWT_SECRET_KEY=your_jwt_secret_key
  - DB_HOST=your_database_host
  - DB_USER=your_database_user
  - DB_PASSWORD=your_database_password
  - DB_NAME=your_database_name

## Usage

Once the server is running, you can interact with the API using any HTTP client like Postman or cURL.

### Example Requests

- **Register User**

  ```bash
  POST /users/register
  Content-Type: application/json

  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "123-456-7890",
    "password": "securepassword123"
  }

- **Login User**

  ```bash
  POST /users/login
  Content-Type: application/json
  
  {
    "email": "john.doe@example.com",
    "password": "securepassword123"
  }

- **Update Profile**

  ```bash
  PUT /users/update-profile
  Authorization: Bearer <your_jwt_token>
  Content-Type: application/json
  
  {
    "name": "John Doe Updated",
    "phone": "987-654-3210"
  }

- **Change Password**

  ```bash
  PUT /users/change-password
  Authorization: Bearer <your_jwt_token>
  Content-Type: application/json
  
  {
    "oldPassword": "securepassword123",
    "newPassword": "newsecurepassword456"
  }

## Contributing

Contributions are welcome! To contribute:

1. **Fork the repository.**
2. **Create a new branch:**

    ```bash
    git checkout -b feature/YourFeature
    ```

3. **Make your changes.**
4. **Commit your changes:**

    ```bash
    git commit -am 'Add new feature'
    ```

5. **Push to the branch:**

    ```bash
    git push origin feature/YourFeature
    ```

6. **Create a Pull Request** to the main repository.

