# API Documentation

## Authentication

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

## Resources

### Get All Resources
```http
GET /api/resources
Authorization: Bearer <token>
```

### Create Resource
```http
POST /api/resources
Authorization: Bearer <token>
Content-Type: multipart/form-data

title: "Resource Title"
type: "quran"
file: <file>
```

### Delete Resource
```http
DELETE /api/resources/:id
Authorization: Bearer <token>
```

## Search

### Search Questions
```http
POST /api/search
Content-Type: application/json

{
  "query": "search query"
}
```

## Response Formats

### Success Response
```json
{
  "data": {},
  "message": "Success message"
}
```

### Error Response
```json
{
  "error": "Error message",
  "status": 400
}
```