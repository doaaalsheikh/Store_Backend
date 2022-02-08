
#  **Storefront Backend Project**


##  **Used Technologies**

For this project I used these libraries:
- **Postgres for the database**
	>  I didn't use Docker container to run Postgres image but I've
       installed Postgres locally on my PC.
- **Node/Express** for the application logic
- **dotenv** from **npm** for managing environment vari**ables
- **db-migrate** from **npm** for migrations
- **jsonwebtoken** from **npm** for working with JWTs
- **jasmine-ts** and **supertest** from **npm** for testing over typescript
- **typescript** from **npm** for coding
- **bcrypt** from **npm** for hashing sensetive data

### **Steps to setup**:
		

 1. install npm 
	 
		 npm install
 2. add `.env` file 
 3. start server
		 
		 npm run dev
 4. test with jasmine

		 npm run test


##  **Environment Variables**:			
				PORT=3000
				POSTGRES_HOST=127.0.0.1
				POSTGRES_DB=store_dev
				POSTGRES_USER=store_user
				POSTGRES_PASSWORD=password123
				POSTGRES_TEST_DB=store_test
				POSTGRES_TEST_USER=store_test_user
				POSTGRES_TEST_PASSWORD=password123
				ENV=dev
				BCRYPT_PASSWORD=your-secret-password
				SALT_ROUNDS=10
				TOKEN_SECRET=mysecrettoken123
	  

##  **DB Creation**
*	open psql in command 

		psql -U postgres
###  **1. DataBase**
* create database via psql:
    	
		CREATE DATABASE store_dev;
		CREATE DATABASE store_test;

###  **2. DataBase Users**
* create database user via psql:
		
		CREATE USER store_user WITH PASSWORD 'password123';
		CREATE USER store_test_user WITH PASSWORD 'password123';
* grant privileges to the users on the databases:
    	
		GRANT ALL PRIVILEGES ON DATABASE store_dev TO store_user;
		GRANT ALL PRIVILEGES ON DATABASE store_test TO store_test_user;
* connect to dev database as dev user:
    	
		\c store_dev store_user;
* connect to test database as test user:
    	
		\c store_test store_test_user;

###  **3. DB Migrations**
I've used `db-migrate` package to create schema tables in the following sequence:
#### **1.categories**:
**`db-migrate create categories-table --sql-file`** 		
>   **up:** 
> 
>  		CREATE  TABLE categories (id SERIAL  PRIMARY  KEY, 
>  		category_name VARCHAR(15) UNIQUE); 		
> **down:** 
> 
> 		DROP  TABLE categories;

#### **2.users**:
**`db-migrate create users-table --sql-file`** 		
>   **up:** 
> 
>  		CREATE  TABLE users (id SERIAL  PRIMARY  KEY,
>  		first_name VARCHAR(20), last_name VARCHAR(20), 
>			username VARCHAR(50) UNIQUE, password  VARCHAR(255));
> **down:** 
> 
> 		DROP  TABLE users;

#### **3.products**:
**`db-migrate create products-table --sql-file`** 		
>   **up:** 
> 
>  		CREATE  TABLE products (id SERIAL  PRIMARY  KEY, 
>  		product_name VARCHAR(50) UNIQUE, product_price INTEGER, 
>  		category_id INTEGER  REFERENCES categories(id) ON DELETE CASCADE);
> **down:** 
>
> 		DROP  TABLE products;
#### **4.orders**:
**`db-migrate create orders-table --sql-file`** 		
>   **up:** 
> 
>  		CREATE  TABLE orders (id SERIAL  PRIMARY  KEY, 
>  		user_id  INTEGER  REFERENCES users(id) ON DELETE CASCADE, 
>  		order_status VARCHAR(15));
> **down:** 
>
> 		DROP  TABLE orders;

#### **5.order_products**:
**`db-migrate create order-products-table --sql-file`** 		
>   **up:** 
> 
>  		CREATE  TABLE order_products (id SERIAL  PRIMARY  KEY, 
>  		order_id INTEGER  REFERENCES orders(id) ON DELETE CASCADE, 
>  		product_id INTEGER  REFERENCES products(id) ON DELETE CASCADE,
>  		product_quantity INTEGER);
> **down:** 
>
> 		DROP  TABLE order_products;

## **Endpoints**
- Endpoint: "/users/first-user/"
 - Http method: POST
 -  Request:
			 
		{
			"username": "user1",
			"first_name": "userFname",
			"last_name": "userLname",
			"password": "password"
		}
 - Response body:
		 
			 [token returned from created user]

##  Categories

- **Add Category**  (args: category_name) [`token required`]
	 - Endpoint: "/categories/"
	 - Http method: `POST`
	 - Request: 
				 

				{"category_name": "category1"}
	 - Response body:
				 
				{ "id": 1,
					"category_name": "category1"
				}
##  Users

 - **Add User** [`token required`]
	 - Endpoint: "/users/"
	 - Http method: `POST`
	 - Request:

			{
				"username": "doaagamal",
				"first_name": "doaa",
				"last_name": "gamal",
				"password": "123"
			}
	 - Response body:
			
 			 [token returned from created user]


 - **Select All Users** [`token required`]
 	 - Endpoint: "/users/"
	 - Http method: `GET` 
	 - Request: N/A
	 - Response body [Array of users]: 
			 
			 [{
					"id": 1,
					"first_name": "userFname",
					"last_name": "userLname",
					"username": "user1",
					"password":
					"$2b$10$VzbWhk98PSOXqDqzwPm01eM.2YVy/H1D3aZBM7iKzLD7qoouuOAwm"
			}]
 - **Select User By ID** [`token required`]	
	 - Endpoint: "/users/:id"
	 - Http method: `GET` 
	 - Request: Param of id no. 1
	 - Response body:
			
			{
				"id": 1,
				"first_name": "userFname",
				"last_name": "userLname",
				"username": "user1",
				"password":
					"$2b$10$VzbWhk98PSOXqDqzwPm01eM.2YVy/H1D3aZBM7iKzLD7qoouuOAwm"
			}
			

##  Products
 - **Add Product** (args: product)  [`token required`]	 
	 - Endpoint: "/products/"	 
	 - Http method: `POST`	  
	 - Request:	 
	 
			{
				"product_name": "product1",
				"product_price": 100,
				"category_id": 1
			}
	 - Response body:

			{
				"id": 1,
				"product_name": "product1",
				"product_price": 100,
				"category_id": 1
			}
 - **Select All Products**
	 - Endpoint: "/products/"
	 - Http method: `GET`
	 - Request: N/A
	 - Response body [Array of Products]:
		 
			[{
				"id": 1,
				"product_name": "product1",
				"product_price": 100,
				"category_id": 1
			}]
			
 - **Select Product By ID** (args: product id)
	 - Endpoint: "/products/:id"
	 - Http method: `GET`
	 - Request: Param of id  no. 1

	 - Response body:
				
			{
				"id": 1,
				"product_name": "product1",
				"product_price": 100,
				"category_id": 1
			}
 - **Products by category** (args: category id)
	 - Endpoint: "/products-by-category/:id"
	 - Http method: `GET`
	 - Request:  Param of id no. 1

	 - Response  [Array of Products by category ID]:

			[{
				"product_id": 1,
				"product_name": "product1",
				"product_price": 100,
				"category_id": 1,
				"category_name": "category1"
			}]

##  Orders
 - **Add Order** (args: order) [`token required`]
	 - Endpoint: "/orders/"	 
	 - Http method: `POST`
	 - Request:

			{
				"user_id": 1,
				"order_status": "active"
			}

	 - Response body:
			 
			{
				"id": 1,
				"user_id": 1,
				"order_status": "active"
			}
 - **Add Order Product** (args: orderProduct)[`token required`]
	 - Endpoint: "/orders/orderDetails"	 	 
	 - Http method: `POST`	 
	 - Request:	 

			{
				"order_id": 1,
				"product_id": 1,
				"product_quantity": 5
			}
	 - Response body:
			
			{
				"id": 1,
				"order_id": 1,
				"product_id": 1,
				"product_quantity": 5
			}


- **Current Order by user** (args: user id)
	 - Endpoint: "/current-order-by-user/:id"
	 - Http method: `GET`
	 - Request:  Param of id no. 1

	 - Response body [ Single order]

			{
				"id": 1,
				"user_id": 1,
				"order_status": "active"
			}

 - **Completed Orders by user** (args: user id)
	 - Endpoint: "/completed-orders-by-user/:id"
	 - Http method: `GET`
	 - Request:  Param of id no. 3

	 - Response  [Array of Orders]:

			[{
				"id": 2,
				"user_id": 3
				"order_status": "completed"
			},
			{
				"id": 3
				"user_id": 3
				"order_status": "completed"
			}]

## **Project Structure**
###  **1. Models**
Data access layer have models for each table in DB:
**`models`** folder is located inside **`db`** folder under **`src`** folder [*src/db/models*]

 - category.ts
 - order.ts
 - orderProduct.ts
 - product.ts
 - user.ts
 

> **NOTE:** database.json file is located under `db` folder
> [*src/db/database.json*]

###  **2. Services**
Data access layer has also another place to put the additional methods that don't map database tables but select data from more than a table to perform specific jobs.
**`services`** folder is located under **`src`** folder [*src/services*]

 - dashboard.ts :
	 - `getOrdersByUser` method
	 - `productsByCategory` method

 
###  **3. Express Handlers**
**`handlers`** folder is located under **`src`** folder [*src/handlers*]
 - categoryHandler.ts
 - orderHandler.ts
 - productHandler.ts
 - userHandler.ts
 - dashboardHandler.ts

### **4.Security**
Security folder is used to locate possible methods which are responsible for security like those which are using jsonwebtoken
**`security`** folder is located under **`src`** folder [*src/security*]

 - validate.ts