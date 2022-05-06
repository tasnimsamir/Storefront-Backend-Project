# Storefront Backend Project

## Setup:
1. yarn : install packages
2. yarn watch : run server
3. create .env file which contains the following parameters:
```
POSTGRES_HOST = 127.0.0.1
POSTGRES_DB = postgres_express_api_dev
POSTGRES_TEST_DB = postgres_express_api_test
POSTGRES_USER = postgres_express_api_user
POSTGRES_PASSWORD = password123

ENV = dev

BCRYPT_PASSWORD = password123
SALT_ROUNDS = 10
TOKEN_SECRET = udacityc2
```
4. create database.json file with the following object:
```
{
    "dev": {
      "driver": "pg",
      "host": "127.0.0.1",
      "database": "postgres_express_api_dev",
      "user": "postgres_express_api_user",
      "password": "password123"
    },
    "test": {
      "driver": "pg",
      "host": "127.0.0.1",
      "database": "postgres_express_api_test",
      "user": "postgres_express_api_user",
      "password": "password123"
    }
}
```

## Tables:
* **users** ```(id:VARCHAR [primary key], firstname:VARCHAR, lastname:VARCHAR, password_digest:VARCHAR)```
* **products** ```(id:VARCHAR [primary key], product_name:VARCHAR, category:VARCHAR, price: number )```
* **orders** ```(id:VARCHAR [primary key], order_status:VARCHAR, user_id:VARCHAR [foreign_key to users table])```
* **order_products** ```(id:VARCHAR [primary key], quantity:number, order_id:number [foreign_key to orders table], product_id:number [foreign_key to products table])```


## API Endpoints
#### users:
* INDEX route: 'http://localhost:8000/users' [GET] 
* SHOW route: 'http://localhost:8000/users/2' [GET] 
* CREATE route: 'http://localhost:8000/users' [POST] 
* Authneticate route: 'http://localhost:8000/users/auth' [POST] 
#### products:
* INDEX route: 'http://localhost:8000/products' [GET] 
* SHOW route: 'http://localhost:8000/products/1' [GET] 
* CREATE route: 'http://localhost:8000/products' [POST] 
#### orders:
* INDEX route: 'http://localhost:8000/orders' [GET] 
* SHOW route: 'http://localhost:8000/users/2/orders' [GET] 
* CREATE route: 'http://localhost:8000/users/2/orders' [POST] 
#### dashboard:
* topFivePopularProducts route: 'http://localhost:8000/top5products' [GET]
* productsByCategory route: 'http://localhost:8000/catProducts/fashion' [GET]
* completedOrders route: 'http://localhost:8000/completedOrders/user/2' [GET]

## Postman Validations
* **Headers**>> ```Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjpudWxsLCJpYXQiOjE2NTE3NzU1NzB9.LJ9Rdn1lO2YOLFbohefH26O6xlGfJ1jdoRHEG1R_5Hs```
* #### users body:
    * Create user: ```{"firstname": "example1","lastname":"example2","password_digest":"password"}```
    *  User Authentication: ```{"id":number,"password_digest":"user password"}```
* #### products body:
    * Create product: ```{"product_name": "dress", "price":550,"category":"fashion"}```
* #### orders body:
    * Create order:```{"order_status":"active/done/in progress"}```
* #### dashboard body:
    * completedOrders:```{"order_status":"active/done/in progress"}```