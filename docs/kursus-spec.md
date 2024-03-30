## Manajemen Kursus

### Membuat kursus baru

- Endpoint : 'POST /api/courses'
- Request Header :
  - Authorization: Bearer token
- Role: Instructor
- Request Body :

```json
{
  "title": "string",
  "description": "string"
}
```

- Response Sukses (Status Code: 201 Created) :

```json
{
  "message": "Courses created successfully.",
  "data": {
    "id": "course_id",
    "title": "string",
    "description": "string",
    "instructor_id": "instructor_id",
    "cretaedAt": "date"
  }
}
```

- Error Response (Status Code: 400 Bad Request) :

```json
{
  "message": "Title or Description is required."
}
```

### Mengedit kursus

- Endpoint : 'PUT /api/courses/:id'
- Request Header :
  - Authorization: Bearer token
- Role: Instructor
- Request Body :

```json
{
  "title": "string",
  "description": "string"
}
```

- Response Sukses (Status Code: 200 OK) :

```json
{
  "message": "Courses updated successfully.",
  "data": {
    "id": "course_id",
    "title": "string",
    "description": "string",
    "instructor_id": "instructor_id",
    "updatedAt": "date"
  }
}
```

- Error Response (Status Code: 400 Bad Request) :

```json
{
  "message": "Title or Description is required."
}
```

- Error Response (Status Code: 404 Not Found) :

```json
{
  "message": "Course not found."
}
```

- Error Response (Status code: 401 Unauthorized) :

```json
{
  "message": "You are not authorized to update this course."
}
```

### Menghapus kursus

- Endpoint : 'DELETE /api/courses/:id'
- Request Header :
  - Authorization: Bearer token
- Role: Instructor
- Response Sukses (Status Code: 200 OK) :

```json
{
  "message": "Courses deleted successfully."
}
```

- Error Response (Status Code: 404 Not Found) :

```json
{
  "message": "Courses not found."
}
```

- Error Response (Status code: 401 Unauthorized) :

```json
{
  "message": "You are not authorized to delete this course."
}
```

### Mengambil daftar kursus

- Endpoint : 'GET /api/courses'
- Request Header :
  - Authorization: Bearer token
- Response Sukses (Status Code: 200 OK) :

```json
{
  "message": "Courses retrieved successfully.",
  "data": [
    {
      "id": "course_id",
      "title": "string",
      "description": "string",
      "instructor_id": "instructor_id",
      "createdAt": "date"
    }
  ]
}
```

- Error Response (Status Code: 404 Not Found) :

```json
{
  "message": "Courses not found."
}
```
