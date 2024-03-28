## Manajemen Post

### Membuat Posting Baru

- Endpoint : 'POST /api/posts'
- Request Body :

```json
{
  "content": "string",
  "courseId": "course_id",
  "parentPostId": "optional_parent_post_id"
}
```

- Response Sukses (Status Code: 201 Created) :

```json
{
  "message": "Post created successfully.",
  "data": {
    "id": "post_id",
    "content": "string",
    "user_id": "user_id",
    "course_id": "course_id",
    "parent_post_id": "optional_parent_post_id"
  }
}
```

- Error Response (Status Code: 400 Bad Request) :

```json
{
  "message": "Content is required."
}
```

### Mengambil daftar posting dalam kursus

- Endpoint : 'GET /api/posts?courseId=:courseId'
- Response Sukses (Status Code: 200 OK) :

```json
{
  "data": [
    {
      "id": "post_id",
      "content": "string",
      "user_id": "user_id",
      "course_id": "course_id",
      "parent_post_id": "optional_parent_post_id"
    }
  ]
}
```
