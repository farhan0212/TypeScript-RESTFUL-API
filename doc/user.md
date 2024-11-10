# User api spec

## Register User

Endpoint: POST /api/users

Request Body : 

```json
{
    "username": "farhan",
    "password": "rahasia",
    "name" : "farhan"
}
```

Response Body (Success) : 

```json
{
    "data": {
        "username": "farhan",
        "name":"farhan",
    }
}
```

Response Body (Failed) : 

```json
{
    "errors": "Username not valid ....",
}
```

## Login User

Endpoint: POST /api/login

Request Body : 

```json
{
    "username": "farhan",
    "password": "rahasia",
}
```

Response Body (Success) : 

```json
{
    "data": {
        "username": "farhan",
        "name":"farhan",
        "token": "uuid"
    }
}
```

Response Body (Failed) : 

```json
{
    "errors": "Username or Password Wrong",
}
```

## Get User

Endpoint: GET /api/users/current

Request Header :
- X-API-TOKEN : token 


Response Body (Success) : 

```json
{
    "data": {
        "username": "farhan",
        "name":"farhan",
    }
}
```

Response Body (Failed) : 

```json
{
    "errors": "Unauthorized ....",
}
```

## Update User

Endpoint: PATCH /api/users/current

Request Header :
- X-API-TOKEN : token 


Response Body (Success) : 

```json
{
    "data": "OK ....."
}
```

Response Body (Failed) : 

```json
{
    "errors": "Unauthorized ....",
}
```

## Logout User

Endpoint: DELETE /api/users/current

Request Header :
- X-API-TOKEN : token 

Request Body : 

```json
{
    "password": "rahasia",   // Tidak wajib
    "name" : "farhan"    //tidak wajib
}
```

Response Body (Success) : 

```json
{
    "data": {
        "username": "farhan",
        "name":"farhan",
    }
}
```

Response Body (Failed) : 

```json
{
    "errors": "Unauthorized ....",
}
```