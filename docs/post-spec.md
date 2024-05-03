## Manajemen Post

### Membuat Posting Baru

- Endpoint : 'POST /api/posts'
- Request Header :
  - Authorization: Bearer
- Role : siswa, instruktur
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

### Mengedit Posting

- Endpoint : 'PUT /api/posts/:id'
- Request Header :
  - Authorization: Bearer
- Role : siswa, instruktur
- Request Body :

```json
{
  "content": "string"
}
```

- Response Sukses (Status Code: 200 OK) :

```json
{
  "message": "Post updated successfully.",
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

- Error Response (Status Code: 404 Not Found) :

```json
{
  "message": "Post not found."
}
```

- Error Response (Status Code: 403 Forbidden) :

```json
{
  "message": "You are not authorized to edit this post."
}
```

### Menghapus Posting

- Endpoint : 'DELETE /api/posts/:id'
- Request Header :
  - Authorization: Bearer
- Role : siswa, instruktur
- Response Sukses (Status Code: 200 OK) :

```json
{
  "message": "Post deleted successfully."
}
```

- Error Response (Status Code: 404 Not Found) :

```json
{
  "message": "Post not found."
}
```

- Error Response (Status Code: 403 Forbidden) :

```json
{
  "message": "You are not authorized to delete this post."
}
```

### Mengambil Daftar Posting

- Endpoint : 'GET /api/posts/:id'
- Request Header :
  - Authorization: Bearer
- Role : siswa, instruktur
- Response Sukses (Status Code: 200 OK) :

```json
{
  "message": "The record has been successfully retrieved.",
  "data": [
    {
      "id": "post_id",
      "content": "string",
      "user_id": "user_id",
      "course_id": "course_id",
      "parent_post_id": "optional_parent_post_id",
      "childPosts": [
        {
          "id": "child_post_id",
          "content": "string",
          "user_id": "user_id",
          "course_id": "course_id",
          "parent_post_id": "post_id"
        }
      ]
    }
  ]
}
```

- Error Response (Status Code: 404 Not Found) :

```json
{
  "message": "Post not found."
}
```

### Mengambil Detail Posting

- Endpoint : 'GET /api/posts/:id'
- Request Header :
  - Authorization: Bearer
- Role : siswa, instruktur
- Response Sukses (Status Code: 200 OK) :

```json
{
  "message": "The record has been successfully retrieved.",
  "data": {
    "id": "post_id",
    "content": "string",
    "user_id": "user_id",
    "course_id": "course_id",
    "parent_post_id": "optional_parent_post_id",
    "childPosts": [
      {
        "id": "child_post_id",
        "content": "string",
        "user_id": "user_id",
        "course_id": "course_id",
        "parent_post_id": "post_id"
      }
    ]
  }
}
```

- Error Response (Status Code: 404 Not Found) :

```json
{
  "message": "Post not found."
}
```
