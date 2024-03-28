## Manajemen Pendaftaran Kursus

### Pendaftaran pengguna ke kursus

- Endpoint : 'POST /api/enrollments'
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

### Mengambil daftar kursus yang diikuti pengguna

- Endpoint : 'GET /api/enrollments'

- Response Sukses (Status Code: 200 OK) :

```json
{
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
