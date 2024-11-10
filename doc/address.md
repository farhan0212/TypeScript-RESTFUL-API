# Address Api Spec

## Create Address

Endpoint : POST /api/contacts/:idContact/addresses

Request Header : 
- X-API-TOKEN : token

Request Body :

```json
{
    "street" : "jalan apa",
    "city" : "kota apa",
    "province" : "provinsi apa",
    "country" : "negara apa",
    "postal_code": "21311"
}
```

Response Body (Success) :

```json
{
    "data" : {
        "street" : "jalan apa",
        "city" : "kota apa",
        "province" : "provinsi apa",
        "country" : "negara apa",
        "postal_code": "21311"
    }
}
```

Response Body (Failed) :
```json
{
    "error" : "postal is required",
}
```

## Get Address

Endpoint : GET /api/contacts/:idContact/addresses/:idAddress

Request Header : 
- X-API-TOKEN : token

Response Body (Success) :

```json
{
    "data" : {
        "street" : "jalan apa",
        "city" : "kota apa",
        "province" : "provinsi apa",
        "country" : "negara apa",
        "postal_code": "21311"
    }
}
```

Response Body (Failed) :
```json
{
    "error" : "address is not found",
}
```

## Update Address
Endpoint : PUT /api/contacts/:idContact/addresses/:idAddress

Request Header : 
- X-API-TOKEN : token

Request Body :

```json
{
    "street" : "jalan apa",
    "city" : "kota apa",
    "province" : "provinsi apa",
    "country" : "negara apa",
    "postal_code": "21311"
}
```

Response Body (Success) :

```json
{
    "data" : {
        "street" : "jalan apa",
        "city" : "kota apa",
        "province" : "provinsi apa",
        "country" : "negara apa",
        "postal_code": "21311"
    }
}
```

Response Body (Failed) :
```json
{
    "error" : "address is not found",
}
```

## Remove Address

Endpoint : DELETE /api/contacts/:idContact/addresses/:idAddress

Request Header : 
- X-API-TOKEN : token


Response Body (Success) :

```json
{
    "data" : "ok"
}
```

Response Body (Failed) :
```json
{
    "error" : "address is not found",
}
```

## List Address

Endpoint : GET /api/contacts/:idContact/addresses

Request Header : 
- X-API-TOKEN : token

Response Body (Success) :

```json
{
    "data" : [
        {
        "id": 1,
        "street" : "jalan apa",
        "city" : "kota apa",
        "province" : "provinsi apa",
        "country" : "negara apa",
        "postal_code": "21311"
    },
    {
        "id": 12,
        "street" : "jalan apa",
        "city" : "kota apa",
        "province" : "provinsi apa",
        "country" : "negara apa",
        "postal_code": "21311"
    }
    ]
}
```

Response Body (Failed) :
```json
{
    "error" : "Contact is not found",
}
```