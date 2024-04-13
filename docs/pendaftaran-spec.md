## Manajemen Pendaftaran Kursus

### Pendaftaran pengguna ke kursus

- Endpoint : 'POST /api/enrollments'
- Request Header :
  - Content-Type: application/json
  - Authorization: Bearer token
- Role: Student
- Request Body :

```json
{
  "courseId": "course_id"
}
```

- Response Sukses (Status Code: 201 Created) :

```json
{
  "message": "Enrollment created successfully.",
  "data": {
    "id": "enrollment_id",
    "user_id": "user_id",
    "course_id": "course_id",
    "progress": 0
  }
}
```

- Error Response (Status Code: 400 Bad Request) :

```json
{
  "message": "Invalid course ID."
}
```

- Error Response (Status Code: 400 Bad Request) :

```json
{
  "message": "You already enrolled in this course."
}
```

### Update progress pengguna di kursus

- Endpoint : 'PUT /api/enrollments/:enrollmentId'
- Request Header :
  - Content-Type: application/json
  - Authorization: Bearer
- Role: Student
- Request Body :

```json
{
  "completedModules": ["module_id"]
}
```

- Response Sukses (Status Code: 200 OK) :

```json
{
  "message": "Enrollment updated successfully.",
  "data": {
    "id": "enrollment_id",
    "user_id": "user_id",
    "course_id": "course_id",
    "progress": 1
  }
}
```

- Error Response (Status Code: 400 Bad Request) :

```json
{
  "message": "Invalid module ID."
}
```

- Error Response (Status Code: 401 Unauthorized) :

```json
{
  "message": "You are not authorized to update this enrollment"
}
```

- Error Response (Status Code: 400 Bad Request)

```json
{
  "message": "Module already completed."
}
```

### Mengambil daftar kursus yang diikuti pengguna

- Endpoint : 'GET /api/enrollments'
- Request Header :
  - Content-Type: application/json
  - Authorization: Bearer token
- Role: Instructor
- Response Sukses (Status Code: 200 OK) :

```json
{
  "message": "Enrollments retrieved successfully.",
  "data": [
    {
      "id": "enrollment_id",
      "user_id": "user_id",
      "course_id": "course_id",
      "progress": 0
    }
  ]
}
```

- Error Response (Status Code: 400 Bad Request) :

```json
{
  "message": "User not found."
}
```
