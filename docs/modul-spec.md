## Manajemen Modul

### Membuat modul baru dalam kursus

- Endpoint : 'POST /api/courses/:courseId/modules'
- Request Header :
  - Content-Type: multipart/form-data
  - Authorization: Bearer token
- Role: Instructor
- Request Form Data:

```json
{
  "title": "string",
  "content": "file"
}
```

- Response Sukses (Status Code: 201 Created) :

```json
{
  "message": "Module created successfully.",
  "data": {
    "id": "module_id",
    "title": "string",
    "content": "string",
    "course_id": "course_id"
  }
}
```

- Error Response (Status Code: 400 Bad Request) :

```json
{
  "message": "Content is required."
}
```

### Mengedit modul dalam kursus

- Endpoint : 'PUT /api/courses/:courseId/modules/:moduleId'
- Request Header :
  - Content-Type: multipart/form-data
  - Authorization: Bearer token
- Role: Instructor
- Request Form Data:

```json
{
  "title": "string",
  "content": "file"
}
```

- Response Sukses (Status Code: 200 OK) :

```json
{
  "message": "Module updated successfully.",
  "data": {
    "id": "module_id",
    "title": "string",
    "content": "string",
    "course_id": "course_id"
  }
}
```

- Error Response (Status Code: 400 Bad Request) :

```json
{
  "message": "Content is required."
}
```

### Mengambil daftar modul dalam kursus

- Endpoint : 'GET /api/courses/:courseId/modules'
- Request Header :
  - Authorization: Bearer token
- Response Sukses (Status Code: 200 OK) :

```json
{
  "data": [
    {
      "id": "module_id",
      "title": "string",
      "content": "string",
      "course_id": "course_id"
    }
  ]
}
```

- Error Response (Status Code: 404 Not Found) :

```json
{
  "message": "Modules not found."
}
```
