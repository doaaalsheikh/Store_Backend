
#  API Endpoints

***Before of all required endpoints, There is an endpoint to create the first user with no token required:***
	

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

- **Add Category**  (args: category_name) [token required]
	 - Endpoint: "/categories/"
	 - Http method: POST
	 - Request: 
				 

				{"category_name": "category1"}
	 - Response body:
				 
				{ "id": 1,
					"category_name": "category1"
				}
##  Users

 - **Add User** [token required]
	 - Endpoint: "/users/"
	 - Http method: POST
	 - Request:

			{
				"username": "doaagamal",
				"first_name": "doaa",
				"last_name": "gamal",
				"password": "123"
			}
	 - Response body:
			
 			 [token returned from created user]


 - **Select All Users** [token required]
 	 - Endpoint: "/users/"
	 - Http method: GET 
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
 - **Select User By ID** [token required]	
	 - Endpoint: "/users/:id"
	 - Http method: GET 
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
 - **Add Product** (args: product)  [token required]	 
	 - Endpoint: "/products/"	 
	 - Http method: POST	  
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
	 - Http method: GET
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
	 - Http method: GET
	 - Request: Param of id  no. 1

	 - Response body:
				
			{
				"id": 1,
				"product_name": "product1",
				"product_price": 100,
				"category_id": 1
			}
-
 - **Products by category** (args: category id)
	 - Endpoint: "/products-by-category/:id"
	 - Http method: GET
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
 - **Add Order** (args: order)
	 - Endpoint: "/orders/"	 
	 - Http method: POST
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

 - **Add Order Product** (args: orderProduct)
	 - Endpoint: "/orders/orderDetails"	 	 
	 - Http method: POST	 
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
	 - Http method: GET
	 - Request:  Param of id no. 1

	 - Response body [ Single order]

			{
				"id": 1,
				"user_id": 1,
				"order_status": "active"
			}
-
 - **Completed Orders by user** (args: user id)
	 - Endpoint: "/completed-orders-by-user/:id"
	 - Http method: GET
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
  

##  Data Shapes

###  categories
- id
- category_name

###  products
- id
- product_name
- product_price
- category_id (FK with categories(id))


###  users
- id
- first_name
- last_name
- username
- password

###  orders
- id
- order_status
- user_id (FK with users(id))
- 
###  orderProducts
- id
- order_id (FK with orders(id))
- product_id (FK with products(id))
- product_quantity