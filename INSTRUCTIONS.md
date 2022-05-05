* .env
* database.json
* create folders

* server: "http://localhost:5000"
* yarn watch >> for serve running
* docker compose up >> for running db
* docker-compose run --rm postgres psql -h 63b078e14cb2 -U postgres_express_api_user -d postgres_express_api_dev 


## API Endpoints

## Tables:
* users (id:VARCHAR [primary key], firstname:VARCHAR, lastname:VARCHAR, password_digest:VARCHAR)
* products (id:VARCHAR [primary key], product_name:VARCHAR, category:VARCHAR, price: number )
* orders (id:VARCHAR [primary key], order_status:VARCHAR, user_id:VARCHAR [foreign_key to users table])
* order_products (id:VARCHAR [primary key], quantity:number, order_id:number [foreign_key to orders table], product_id:number [foreign_key to products table])