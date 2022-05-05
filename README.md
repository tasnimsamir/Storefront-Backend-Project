# Storefront Backend Project

* .env
* database.json
* create folders

* server: "http://localhost:5000"
* yarn watch >> for serve running
* docker compose up >> for running db
* docker-compose run --rm postgres psql -h 63b078e14cb2 -U postgres_express_api_user -d postgres_express_api_dev 




## Tables:
* **users** (id:VARCHAR [primary key], firstname:VARCHAR, lastname:VARCHAR, password_digest:VARCHAR)
* **products** (id:VARCHAR [primary key], product_name:VARCHAR, category:VARCHAR, price: number )
* **orders** (id:VARCHAR [primary key], order_status:VARCHAR, user_id:VARCHAR [foreign_key to users table])
* **order_products** (id:VARCHAR [primary key], quantity:number, order_id:number [foreign_key to orders table], product_id:number [foreign_key to products table])


## API Endpoints
#### users:
* INDEX route: '/users' [GET] 
* SHOW route: '/users/:id' [GET] 
* CREATE route: '/users' [POST] 
* Authneticate route: '/users/auth' [POST] 
#### products:

## Postman Validations
* **Headers**>> Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjpudWxsLCJpYXQiOjE2NTE3NzU1NzB9.LJ9Rdn1lO2YOLFbohefH26O6xlGfJ1jdoRHEG1R_5Hs
#### users:
* Create user body: {"firstname": "example1","lastname":"example2","password_digest":"password"}

* User Authentication body: {"id":number,"password_digest":"user password"}
