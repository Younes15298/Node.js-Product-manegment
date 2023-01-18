
# Node.js Product manegment

this project handels  validated signup and login authintecation with authorization .

you can create product, edit product and delete product.   

you can add order , get specific order , delete order .



## Installation

Install my-project with npm

```bash
  npm install my-project
  cd my-project
```

Add your mongoDB  and token key  in .env file
    
```bash
URI_DB=Your_database_uri 
TOKEN_KEY=secret
```


## API user Reference
#### you must add user token in headers  in Authorization and the value Bearer user-token to (create product - edit product - delete product - create order - get all order - delete order )
#### create user

```http
  POST localhost:3000/user/user
```
| body (json)  | Type     | Description                       |
| :--------  | :------- | :-------------------------------- |
| `email`    | `string` | **Required**. |
| `password` | `string` | **Required**. |



#### create user

```http
  POST localhost:3000/user/login
```
| body (json)  | Type     | Description                       |
| :--------  | :------- | :-------------------------------- |
| `email`    | `string` | **Required**. |
| `password` | `string` | **Required**. |

#### Delete user

```http
  DELETE localhost:3000/user/${id}
```

| Parameter  | Type     | Description                       |
| :--------  | :------- | :-------------------------------- |
| `${id}`    | `string` | **Required**. Id of order to fetch |





## API Product Reference


#### add product

```http
  POST localhost:3000/products/
```

| body (form-data)  | Type     | Description                       |
| :--------         | :------- | :-------------------------------- |
| `name`            | `text`   | **Required**.                     |
| `price`           | `text`   | **Required**.                     |
| `productImage`    | `file`   | **Required**.                     |



#### Get all items

```http
  GET localhost:3000/products
```


#### Get item

```http
  GET localhost:3000/products/${id}
```

| Parameter  | Type     | Description                       |
| :--------  | :------- | :-------------------------------- |
| `${id}`    | `string` | **Required**. Id of item to fetch |




#### edit item

```http
  Patch localhost:3000/products/${id}
```

example:
```
[
    {
        "propName": "name", "value" :"product name" 
        
    },{
         "propName": "price", "value" :"product price"
    }  
]

```
#### Delete item

```http
  DELETE localhost:3000/products/${id}
```
| Parameter  | Type     | Description                       |
| :--------  | :------- | :-------------------------------- |
| `${id}`    | `string` | **Required**. Id of order to fetch |


## API Order Reference





#### Get all orders

```http
  GET localhost:3000/orders
```

| Parameter  | Type     | Description                       |
| :--------  | :------- | :-------------------------------- |
| `${id}`    | `string` | **Required**. Id of order to fetch |





#### make order

```http
  POST localhost:3000/orders/${id}
```

example: productId and quantity are  **Required**
```
[
    "productId": "Id of product",
    "quantity: "product quantity"
]

```


#### Get order

```http
  GET localhost:3000/orders/${id}
```

| Parameter  | Type     | Description                       |
| :--------  | :------- | :-------------------------------- |
| `${id}`    | `string` | **Required**. Id of order to fetch |




#### Delete order

```http
  DELETE localhost:3000/orders/${id}
```
| Parameter  | Type     | Description                       |
| :--------  | :------- | :-------------------------------- |
| `${id}`    | `string` | **Required**. Id of order to fetch |




