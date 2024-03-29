## Authentikasi Pengguna

### Registrasi Pengguna

- Endpoint : 'POST /api/auth/register'
- Request Body :

```json
{
  "name": "string",
  "username": "string",
  "email": "string",
  "password": "string",
  "role": "string"
}
```

- Response Sukses (Status Code: 201 Created) :

```json
{
  "message": "User registered successfully.",
  "data": {
    "id": "string",
    "username": "string",
    "email": "string",
    "role": "string",
    "createdAt": "date",
  }
}
```

- Error Response (Status Code: 400 Bad Request) :

```json
{
  "message": "Email or Username already exists."
}
```

### Login Pengguna

- Endpoint : 'POST /api/auth/login'
- Request Body :

```json
{
  "email": "string",
  "password": "string"
}
```

- Response Sukses (Status Code: 201 Created) :

```json
{
  "token": "JWT Token"
}
```

- Error Response (Status Code: 400 Bad Request) :

```json
{
  "message": "Invalid credentials."
}
```

- Error Response Not Found (Status Code: 404 Not Found) :

```json
{
  "message": "User not found."
}
```
