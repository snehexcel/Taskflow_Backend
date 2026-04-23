# TaskFlow API Documentation

Complete API reference for TaskFlow application.

## Base URL

- Development: `http://localhost:3000/api/v1`
- Production: `https://taskflow.vercel.app/api/v1`

## Authentication

All protected endpoints require authentication via JWT tokens stored in httpOnly cookies or Authorization header.

**Authorization Header Format:**
```
Authorization: Bearer <token>
```

## Response Format

### Success Response
```json
{
  "success": true,
  "data": {}
}
```

### Error Response
```json
{
  "error": "Error message",
  "details": []
}
```

## Endpoints

### Authentication Endpoints

#### 1. Register
Create a new user account.

**Request:**
```
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123",
  "full_name": "John Doe"
}
```

**Validation Rules:**
- email: Valid email format
- password: Minimum 8 characters
- full_name: Minimum 2 characters

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "full_name": "John Doe",
    "role": "user"
  }
}
```

**Status Codes:**
- 201: Account created successfully
- 400: Validation error
- 409: Email already registered
- 500: Server error

---

#### 2. Login
Authenticate and receive JWT token.

**Request:**
```
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "full_name": "John Doe",
    "role": "user"
  }
}
```

**Status Codes:**
- 200: Login successful
- 400: Validation error
- 401: Invalid credentials
- 403: Account inactive
- 500: Server error

**Note:** JWT tokens are returned as httpOnly cookies automatically.

---

#### 3. Logout
End the user session.

**Request:**
```
POST /auth/logout
```

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

**Status Codes:**
- 200: Logout successful
- 500: Server error

---

#### 4. Get Current User
Retrieve authenticated user information.

**Request:**
```
GET /auth/me
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "full_name": "John Doe",
    "role": "user",
    "is_active": true
  }
}
```

**Status Codes:**
- 200: User retrieved successfully
- 401: Unauthorized
- 404: User not found
- 500: Server error

---

### Task Endpoints

#### 5. Get All Tasks
Retrieve all tasks for the authenticated user.

**Request:**
```
GET /tasks
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "tasks": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "user_id": "550e8400-e29b-41d4-a716-446655440000",
      "title": "Complete project proposal",
      "description": "Write and submit the Q1 project proposal",
      "status": "in_progress",
      "priority": "high",
      "due_date": "2024-12-31T23:59:59Z",
      "created_at": "2024-01-01T10:00:00Z",
      "updated_at": "2024-01-02T15:30:00Z"
    }
  ]
}
```

**Status Codes:**
- 200: Tasks retrieved successfully
- 401: Unauthorized
- 500: Server error

---

#### 6. Create Task
Create a new task.

**Request:**
```
POST /tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Complete project proposal",
  "description": "Write and submit the Q1 project proposal",
  "status": "pending",
  "priority": "high",
  "due_date": "2024-12-31T23:59:59Z"
}
```

**Validation Rules:**
- title: Required, 1-255 characters
- description: Optional
- status: One of 'pending', 'in_progress', 'completed'
- priority: One of 'low', 'medium', 'high'
- due_date: Optional, ISO 8601 format

**Response:**
```json
{
  "success": true,
  "task": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Complete project proposal",
    "description": "Write and submit the Q1 project proposal",
    "status": "pending",
    "priority": "high",
    "due_date": "2024-12-31T23:59:59Z",
    "created_at": "2024-01-01T10:00:00Z",
    "updated_at": "2024-01-01T10:00:00Z"
  }
}
```

**Status Codes:**
- 201: Task created successfully
- 400: Validation error
- 401: Unauthorized
- 500: Server error

---

#### 7. Get Single Task
Retrieve a specific task.

**Request:**
```
GET /tasks/:id
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "task": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Complete project proposal",
    "description": "Write and submit the Q1 project proposal",
    "status": "pending",
    "priority": "high",
    "due_date": "2024-12-31T23:59:59Z",
    "created_at": "2024-01-01T10:00:00Z",
    "updated_at": "2024-01-01T10:00:00Z"
  }
}
```

**Status Codes:**
- 200: Task retrieved successfully
- 401: Unauthorized
- 404: Task not found
- 500: Server error

---

#### 8. Update Task
Update an existing task.

**Request:**
```
PATCH /tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated task title",
  "status": "in_progress",
  "priority": "medium"
}
```

**Validation Rules:**
- title: Optional, 1-255 characters
- description: Optional
- status: Optional, one of 'pending', 'in_progress', 'completed'
- priority: Optional, one of 'low', 'medium', 'high'
- due_date: Optional, ISO 8601 format

**Response:**
```json
{
  "success": true,
  "task": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Updated task title",
    "description": "Write and submit the Q1 project proposal",
    "status": "in_progress",
    "priority": "medium",
    "due_date": "2024-12-31T23:59:59Z",
    "created_at": "2024-01-01T10:00:00Z",
    "updated_at": "2024-01-03T12:00:00Z"
  }
}
```

**Status Codes:**
- 200: Task updated successfully
- 400: Validation error
- 401: Unauthorized
- 404: Task not found
- 500: Server error

---

#### 9. Delete Task
Delete a task.

**Request:**
```
DELETE /tasks/:id
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Task deleted"
}
```

**Status Codes:**
- 200: Task deleted successfully
- 401: Unauthorized
- 404: Task not found
- 500: Server error

---

## Error Handling

### Error Codes

- **400 Bad Request**: Validation error or invalid input
- **401 Unauthorized**: Missing or invalid authentication token
- **403 Forbidden**: Authenticated but not authorized for this resource
- **404 Not Found**: Resource does not exist
- **409 Conflict**: Resource already exists (e.g., email taken)
- **500 Internal Server Error**: Server error

### Error Response Format
```json
{
  "error": "Error message",
  "details": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

---

## Rate Limiting

Rate limiting is implemented to prevent abuse:
- 100 requests per minute per IP address
- 1000 requests per hour per IP address

---

## Examples

### Complete User Flow

**1. Register**
```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePassword123",
    "full_name": "John Doe"
  }'
```

**2. Login**
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePassword123"
  }' \
  -c cookies.txt
```

**3. Create Task**
```bash
curl -X POST http://localhost:3000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "title": "My first task",
    "priority": "high"
  }'
```

**4. Get Tasks**
```bash
curl -X GET http://localhost:3000/api/v1/tasks \
  -b cookies.txt
```

**5. Update Task**
```bash
curl -X PATCH http://localhost:3000/api/v1/tasks/550e8400-e29b-41d4-a716-446655440001 \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "status": "completed"
  }'
```

**6. Logout**
```bash
curl -X POST http://localhost:3000/api/v1/auth/logout \
  -b cookies.txt
```

---

## Changelog

### Version 1.0.0 (Initial Release)
- User authentication (register, login, logout)
- Task CRUD operations
- JWT token-based authentication
- Row Level Security (RLS) for data isolation

---

## Support

For API questions or issues, contact support@taskflow.app
