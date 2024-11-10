# Contact API Spec

## Create Contact

Endpoint : POST /api/contacts

Request Header : 
- X-API-TOKEN : token

Request Body :

```json
{
    "first name" : "Farhan",
    "last name" : "Ramadan",
    "email" : "farhan@example.com",
    "phone" : "123412341234"
}
```

Response Body (Success) :

```json
{
    "data" : {
        "id": 1,
        "first name" : "Farhan",
        "last name" : "Ramadan",
        "email" : "farhan@example.com",
        "phone" : "123412341234"
    }
}
```

Response Body (Failed) :
```json
{
    "error" : "first name must not blank, ...",
}
```

## Get Contact

Endpoint : GET /api/contacts/:id

Request Header : 
- X-API-TOKEN : token

Response Body (Success) :

```json
{
    "data" : {
        "id": 1,
        "first name" : "Farhan",
        "last name" : "Ramadan",
        "email" : "farhan@example.com",
        "phone" : "123412341234"
    }
}
```

Response Body (Failed) :
```json
{
    "error" : "contact not found",
}
```

## Update Contact

Endpoint : PUT /api/contacts/:id

Request Header : 
- X-API-TOKEN : token

Request Body :

```json
{
    "first name" : "Farhan",
    "last name" : "Ramadan",
    "email" : "farhan@example.com",
    "phone" : "123412341234"
}
```

Response Body (Success) :

```json
{
    "data" : {
        "id": 1,
        "first name" : "Farhan",
        "last name" : "Ramadan",
        "email" : "farhan@example.com",
        "phone" : "123412341234"
    }
}
```

Response Body (Failed) :
```json
{
    "error" : "first name must not blank, ...",
}
```

## Remove Contact

Endpoint : DELETE /api/contacts/:id

Request Header : 
- X-API-TOKEN : token

Response Body (Success) :

```json
{
    "data" : "OK"
}
```

Response Body (Failed) :
```json
{
    "error" : "Contact not found",
}
```

## Search Contact

Endpoint : GET /api/contacts/

Query Parameter :
- Name : string, contact first name or contact last name, optional
- Phone : string, contact phone optional
- Email : string, contact email optional
- Page : number, default 1
- Size : number, default 10

Request Header : 
- X-API-TOKEN : token

Response Body (Success) :

```json
{
    "data" : [
        {
        "id": 1,
        "first name" : "Farhan",
        "last name" : "Ramadan",
        "email" : "farhan@example.com",
        "phone" : "123412341234"
    },
    {
        "id": 12,
        "first name" : "John",
        "last name" : "Doe",
        "email" : "JohnDoe@example.com",
        "phone" : "123123123123"
    },{
        "paging" : {
            "current_page" : 1,
            "total_page" : 10,
            "size" : 10
        }
    }
    ]
}
```

Response Body (Failed) :
```json
{
    "error" : "Unathorized",
}
```