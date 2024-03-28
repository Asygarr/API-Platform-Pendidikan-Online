## Manajemen Kursus

### Membuat kursus baru

- Endpoint : 'POST /api/courses'
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

### Mengambil daftar kursus

- Endpoint : 'GET /api/courses'
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
