# Phoenix API & Web Interface

## Table of Contents
1. [Introduction](#introduction)
2. [Authentication Flow](#-authentication-flow)
3. [Web Interface](#web-interface)
4. [API Endpoints](#api-endpoints)
   - [Auth](#auth)
   - [Gadgets](#gadgets)
5. [Error Handling](#error-handling)
6. [Rate Limiting](#rate-limiting)
7. [Best Practices](#best-practices)
8. [Support](#support)

## Introduction
Welcome to the Phoenix API documentation. This project provides both a RESTful API and a web interface for user authentication and gadget management. The API follows RESTful principles and uses JWT for authentication.

**Base URL**: `https://your-api-domain.com/api`

## 🔐 Authentication Flow

1. **Registration**
   - Send a POST request to `/api/register` with user details
   - The API will create a new user account

2. **Login**
   - Send a POST request to `/api/login` with credentials
   - On success, you'll receive:
     - A JWT token in an HTTP-only cookie (automatically handled by browsers)
     - User details in the response body

3. **Making Authenticated Requests**
   - For API clients: Include `Authorization: Bearer {token}` header
   - For web browsers: The HTTP-only cookie is automatically included

4. **Token Expiration**
   - Tokens expire after 1 hour
   - After expiration, users need to log in again

### Password Requirements:
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 number
- At least 1 special character

## Web Interface
This project includes EJS-based web pages that provide a user-friendly interface to interact with the API:

### Available Pages:
- **Login Page** (`/api/login`)
  - User authentication with username and password
  - Redirects to dashboard on successful login

- **Registration Page** (`/api/register`)
  - New user registration form
  - Collects username, password, and full name

- **User Dashboard** (`/api/info`)
  - Displays user information
  - Shows authentication token
  - Provides links to API documentation

### Features:
- Responsive design using Tailwind CSS
- Client-side form validation
- Secure JWT token handling via HTTP-only cookies
- Automatic redirection for unauthenticated users

To get started with the web interface, simply navigate to the respective routes in your web browser after starting the server.

## Authentication
This API uses JWT (JSON Web Tokens) for authentication. The token should be included in the `Authorization` header as a Bearer token or in an HTTP-only cookie.

### Obtaining a Token
1. Register a new user at `POST /api/register`
2. Login at `POST /api/login`
3. The server will return a JWT token in an HTTP-only cookie

### Using the Token
Include the token in your requests in one of these ways:
- **Cookie**: Automatically sent by the browser
- **Header**: `Authorization: Bearer <token>`

## API Endpoints

### Auth

#### Register a New User
```http
POST /api/register
```

**Request Body**:
```json
{
  "username": "string",
  "password": "string",
  "fullname": "string"
}
```

**Response**:
- 201 Created: User registered successfully
- 400 Bad Request: Missing required fields
- 409 Conflict: Username already exists

---

#### Login
```http
POST /api/login
```

**Request Body**:
```json
{
  "username": "string",
  "password": "string"
}
```

**Response**:
- 200 OK: Login successful (sets HTTP-only cookie)
- 401 Unauthorized: Invalid credentials

---

#### Get User Info
```http
GET /api/info
```

**Headers**:
```
Cookie: token=<jwt_token>
```

**Response**:
```json
{
  "user": {
    "id": "string",
    "username": "string",
    "fullname": "string"
  }
}
```

### Gadgets

#### Get All Gadgets
```http
GET /api/gadgets
```

**Headers**:
```
Authorization: Bearer <jwt_token>
```

**Response**:
```json
[
  {
    "id": "string",
    "name": "string",
    "description": "string",
    "createdAt": "datetime",
    "updatedAt": "datetime"
  }
]
```

---

#### Create Gadget
```http
POST /api/gadgets
```

**Headers**:
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body**:
```json
{
  "name": "string",
  "description": "string"
}
```

**Response**:
- 201 Created: Gadget created successfully
- 400 Bad Request: Invalid input

---

#### Update Gadget
```http
PATCH /api/gadgets
```

**Headers**:
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body**:
```json
{
  "id": "string",
  "updates": {
    "name": "string",
    "description": "string"
  }
}
```

**Response**:
- 200 OK: Gadget updated successfully
- 404 Not Found: Gadget not found

---

#### Delete Gadget
```http
DELETE /api/gadgets
```

**Headers**:
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body**:
```json
{
  "id": "string"
}
```

**Response**:
- 200 OK: Gadget deleted successfully
- 404 Not Found: Gadget not found

---

#### Self-Destruct Gadget
```http
POST /api/gadgets/:id/self-destruct
```

**Headers**:
```
Authorization: Bearer <jwt_token>
```

**Response**:
- 200 OK: Gadget will self-destruct in 5 seconds
- 404 Not Found: Gadget not found

## Error Handling

### Error Response Format
```json
{
  "error": {
    "statusCode": number,
    "message": "string",
    "timestamp": "datetime",
    "path": "string"
  }
}
```

### Common HTTP Status Codes
- 200 OK: Request successful
- 201 Created: Resource created successfully
- 400 Bad Request: Invalid request body or parameters
- 401 Unauthorized: Authentication required
- 403 Forbidden: Insufficient permissions
- 404 Not Found: Resource not found
- 409 Conflict: Resource already exists
- 500 Internal Server Error: Server error

## Rate Limiting
API is rate limited to 100 requests per 15 minutes per IP address.

## Best Practices
1. Always check for the latest API version
2. Implement proper error handling
3. Cache responses when appropriate
4. Use HTTPS for all requests
5. Keep your API keys secure
6. Follow RESTful principles for endpoint design
7. Use appropriate HTTP methods and status codes

## Support
For support, please contact [Bhuvan Annappa](mailto:bhuvanannappa@gmail.com) or open an issue in our [GitHub repository](https://github.com/Cyanidebob0/phoenix-api).
