# Authentication API Test Commands

## Prerequisites
Make sure your server is running:
```bash
npm run dev
```

## Sign Up Tests

### 1. Create Admin User
```bash
curl -X POST http://localhost:3000/api/auth/sign-up \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123",
    "role": "admin"
  }'
```

### 2. Create Regular User
```bash
curl -X POST http://localhost:3000/api/auth/sign-up \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "password": "mypassword456",
    "role": "user"
  }'
```

### 3. Create User with Default Role
```bash
curl -X POST http://localhost:3000/api/auth/sign-up \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bob Wilson",
    "email": "bob.wilson@example.com",
    "password": "securepass789"
  }'
```

### 4. Test Duplicate Email (Should Fail)
```bash
curl -X POST http://localhost:3000/api/auth/sign-up \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Duplicate",
    "email": "john.doe@example.com",
    "password": "anotherpassword"
  }'
```

## Sign In Tests

### 1. Sign In with Admin Credentials
```bash
curl -X POST http://localhost:3000/api/auth/sign-in \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "email": "john.doe@example.com",
    "password": "password123"
  }'
```

### 2. Sign In with User Credentials
```bash
curl -X POST http://localhost:3000/api/auth/sign-in \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "email": "jane.smith@example.com",
    "password": "mypassword456"
  }'
```

### 3. Sign In with Invalid Credentials (Should Fail)
```bash
curl -X POST http://localhost:3000/api/auth/sign-in \
  -H "Content-Type: application/json" \
  -d '{
    "email": "nonexistent@example.com",
    "password": "wrongpassword"
  }'
```

### 4. Sign In with Wrong Password (Should Fail)
```bash
curl -X POST http://localhost:3000/api/auth/sign-in \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "wrongpassword123"
  }'
```

## Sign Out Test

### Sign Out (Use cookies from sign-in)
```bash
curl -X POST http://localhost:3000/api/auth/sign-out \
  -H "Content-Type: application/json" \
  -b cookies.txt
```

## Validation Error Tests

### 1. Short Name (Should Fail)
```bash
curl -X POST http://localhost:3000/api/auth/sign-up \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jo",
    "email": "jo@example.com",
    "password": "password123"
  }'
```

### 2. Invalid Email Format (Should Fail)
```bash
curl -X POST http://localhost:3000/api/auth/sign-up \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "invalid-email",
    "password": "password123"
  }'
```

### 3. Short Password (Should Fail)
```bash
curl -X POST http://localhost:3000/api/auth/sign-up \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "123"
  }'
```

### 4. Invalid Role (Should Fail)
```bash
curl -X POST http://localhost:3000/api/auth/sign-up \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "role": "superuser"
  }'
```

### 5. Missing Email for Sign In (Should Fail)
```bash
curl -X POST http://localhost:3000/api/auth/sign-in \
  -H "Content-Type: application/json" \
  -d '{
    "password": "password123"
  }'
```

### 6. Missing Password for Sign In (Should Fail)
```bash
curl -X POST http://localhost:3000/api/auth/sign-in \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com"
  }'
```

## Additional Test Cases

### Health Check
```bash
curl -X GET http://localhost:3000/health
```

### Root Endpoint
```bash
curl -X GET http://localhost:3000/
```

## Expected Response Formats

### Successful Sign Up Response:
```json
{
  "message": "User created successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": "admin"
  }
}
```

### Successful Sign In Response:
```json
{
  "message": "User signed in successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": "admin"
  }
}
```

### Successful Sign Out Response:
```json
{
  "message": "User signed out successfully"
}
```

### Error Response Example:
```json
{
  "error": "Validation Failed",
  "details": "String must contain at least 3 character(s)"
}
```

### Invalid Credentials Error:
```json
{
  "message": "Invalid credentials"
}
```

### Duplicate User Error:
```json
{
  "message": "User already exists"
}
```