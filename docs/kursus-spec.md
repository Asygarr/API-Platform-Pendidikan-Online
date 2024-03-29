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
    "instructor_id": "instructor_id"
  }
}
```

- Error Response (Status Code: 400 Bad Request) :

```json
{
  "message": "Title is required."
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
    "instructor_id": "instructor_id"
  }
}
```

- Error Response (Status Code: 400 Bad Request) :

```json
{
  "message": "Title is required."
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

### Mengambil daftar kursus

- Endpoint : 'GET /api/courses'
- Request Header :
  - Authorization: Bearer token
- Response Sukses (Status Code: 200 OK) :

```json
{
  "data": [
    {
      "id": "course_id",
      "title": "string",
      "description": "string",
      "instructor_id": "instructor_id"
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
