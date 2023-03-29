
# User Api

This API provides endpoints for managing users. Users can be created, read, updated, and deleted depending on the user's role. Admin and card users have full access to all endpoints, while company users can only view and update their own information. The API endpoints are protected with authentication, and unauthorized access will be rejected.


## Create Admin User

  This API endpoint creates a new admin user with the given information in the request body, Can't be use if admin user already exists.

* **Method:**

  `POST`

* **URL:**

  `/user/admin`


* **Request Body:**

    * name: `string(required)` - The first name of admin user.
    * surname: `string(required)` - The last name of admin user.
    * email: `string(required)` - The email address of admin user.
    * password: `string(required)` - The password of admin user.

* **Example:**

   ``` 
    {
        "name": "John",
        "surname": "Doe",
        "email": "johndoe@example.com",
        "password": "mysecretpassword"
    }
    ```
    

* **Success Response:**

    * Status Code : `200 OK`
    * Content :

        ```
        {
            "message" : "Admin user created successfully"
        }
        ```
 
* **Error Response:**

    * Status Code : `401` - If an admin user already exists.
    * Content :

        ```
        {
            "message": "Admin user already exists"
        }
        ```

    **OR**

    * Status Code : `500` - If an error occurred while creating the admin user.
    * Content :

        ```
        {
            "message": "Error creating admin user"
        }
        ```
    

        



## User Login

This API endpoint is used to log in an existing user with their email address or username and password.

* **Method:**

    `POST`

* **URL:**

    `/user/login`

* **Request Body:**

    * login: `string(required)` - The email address or username of the user.
    * password: `string(required)` - The password of the user.
    
* **Example:**

    ```
    {
        "login": "johndoe@example.com",
        "password": "mysecretpassword"
    }       
    ```

* **Success Response:**

    * Status Code : `200 OK`
    * Content :
    
        ```
        {
            "message" : "Welcome Back!",
            "token": <jwt_token>
        }
        ```

        *The token field contains a JSON Web Token (JWT) that can be used to authenticate future requests.*

* **Error Response:**

    * Status Code : `401` - If the username or email is not found in the database.
    * Content :

        ```
        {
            "message": "Username or email not found!"
        }
        ```
    **OR**

    * Status Code : `402` - If the password provided does not match the user's password in the database.
    * Content :

        ```
        {
            "message": "Password does not match!"
        }
        ```
    **OR**

    * Status Code : `500` - If an error occurred while retrieving the user data.
    * Content :

        ```
        {
            "message": "Internal server error"
        }
        ```
## Create User

This API endpoint creates a new user with the given information in the request body, based on the role and permissions of the authenticated user.

* **Method:**

    `POST`

* **URL:**

    `/user/register`

* **Headers:**

    Authorization: `Bearer <jwt_token>` (required) - Access token obtained after successful authentication.

* **Request Body:**

    * name: `string(required)` - The first name of the user.
    * surname: `string(required)` - The last name of the user.
    * email: `string(required)` - The email address of the user.
    * password: `string(required)` - The password of the user.
    * role: `string(required)` - The role of the user. Possible values: admin, card, company.
    * company_id: `integer` - The ID of the company associated with the user (only required for company users).
    
* **Example:**

    ```
    {
        "name": "John",
        "surname": "Doe",
        "email": "johndoe@example.com",
        "password": "mysecretpassword",
        "role": "admin"
    }
    ```

* **Success Response:**

    * Status Code : `200 OK`
    * Content :
    
        ```
        {
            "message" : "User created successfully"
        }
        ```

* **Error Response:**

    * Status Code : `401` - If the authenticated user is a company user and tries to create another user.
    * Content :

        ```
        {
            "message": "Company users can't create other users"
        }
        ```
    **OR**

    * Status Code : `402` - If the authenticated user is a card user and tries to create a user with role admin or card.
    * Content :

        ```
        {
            "message": "Card users can't create users with role 'card' or 'admin'"
        }

        ```
    **OR**

    * Status Code : `500` - If an error occurred while creating the user.
    * Content :

        ```
        {
            "message": "Cannot register user at the moment!"
        }

        ```
## Get User Information

This API endpoint retrieves user information based on the authenticated user's token.

* **Method:**

    `GET`

* **URL:**

    `/user/info`

* **Headers:**

    Authorization: `Bearer <jwt_token>` (required) - Access token obtained after successful authentication.

* **Success Response:**

    * Status Code : `200 OK`
    * Content :
    
        ```
        {
            "id": "1234",
            "name" : "john",
            "surname" : "doe",
            "telephone" : "01234",
            "email" : "johndoe@example.com",
            "role": "company",
            "username": "johndoe",
            "password": <hashedpassword>,
            "company_id": "5678",
            "createdAt": "2022-01-01T00:00:00.000Z",
            "updatedAt": "2022-01-01T00:00:00.000Z",
            "company": {
                "id": "5678",
                "name": "Example Inc",
                "address": "99/99 Example",
                "telephone": "09999",
                "createdAt": "2022-01-01T00:00:00.000Z",
                "updatedAt": "2022-01-01T00:00:00.000Z"
            }     
        }
        ```
        *If user role is company, Password show in hashed format*

    **OR**

    * Content:

        ```
        {
            "id": "4321",
            "name" : "alex",
            "surname" : "des",
            "telephone" : "04321",
            "email" : "alexdes@example.com",
            "role": "card",
            "username": "card",
            "password": <hashedpassword>,
            "company_id": null,
            "createdAt": "2022-01-01T00:00:00.000Z",
            "updatedAt": "2022-01-01T00:00:00.000Z",   
        }
        ```
        *If user role is card or admin, Password show in hashed format*

* **Error Response**
    * Status Code : `401` Unauthorized
    * Content :

        ```
        {
            "message": "Unauthorized"
        }
        ```
    **OR**
    * Status Code : `500` Internal server error
    * Content :

        ```
        {
            "message": "Internal server error"
        }
        ```

## Get All Users

This API endpoint gets all users and their related companies if any.

* **Method:**

    `GET`

* **URL:**

    `/user`

* **Headers:**
    
    Authorization: `Bearer <jwt_token>` (required) - Access token obtained after successful authentication.


* **Success Response:**

    * Status Code : `200 OK`
    * Content :
    
        ```
        [
            {
                "id": 1,
                "name": "John",
                "surname": "Doe",
                "email": "johndoe@example.com",
                "role": "admin",
                "username": "johndoe",
                "password": <hashedpassword>,
                "company_id": null,
                "createdAt": "2023-01-30T08:57:11.829Z",
                "updatedAt": "2023-01-30T08:57:11.829Z",
                "company": null
            },
            {
                "id": 2,
                "name": "Jane",
                "surname": "Doe",
                "telephone" : "02222",
                "email": "janedoe@example.com",
                "role": "card",
                "username": "janedoe",
                "password": <hashedpassword>,
                "company_id": 1,
                "createdAt": "2023-01-30T08:57:11.829Z",
                "updatedAt": "2023-01-30T08:57:11.829Z",
                "company": {
                    "id": 1,
                    "name": "XYZ Corp",
                    "address": "456 Main St",
                    "telephone" : "01111"
                    "createdAt": "2023-01-30T08:57:11.829Z",
                    "updatedAt": "2023-01-30T08:57:11.829Z"
                }
            },
            ...
        ]

        ```

* **Error Response:**

    * Status Code : `401` - If the user is company, It is unauthorized to access the endpoint.
    * Content :

        ```
        {
            "message": "Unauthorized"
        }
        ```
    **OR**

    * Status Code : `402` - If the authenticated user is a card user and tries to create a user with role admin or card.
    * Content :

        ```
        {
            "message": "Card users can't create users with role 'card' or 'admin'"
        }

        ```
    **OR**

    * Status Code : `500` - If an error occurred while creating the user.
    * Content :

        ```
        {
            "message": "Error retrieving users"
        }
        ```
## Get User with Parameters

This API endpoint retrieves a list of users that match the query parameters. Only authorized admin and card users can access this endpoint.

* **Method:**

    `POST`

* **URL:**

    `/user/search`

* **Headers:**

    Authorization: `Bearer <jwt_token>` (required) - Access token obtained after successful authentication.

* **Query Parameters:**
    * id: `number` - The first name of the user to retrieve.
    * name: `string` - The first name of the user to retrieve.
    * surname: `string` - The last name of the user to retrieve.
    * telephone: `string` - The telephone number of the user to retrieve.
    * role: `string` - The role of the user to retrieve.
    * company_id: `number` - The ID of the company associated with the user to retrieve.

* **Example:**
    ```
    /search?id=1&role=admin
    ```

* **Success Response:**

    * Status Code : `200 OK`
    * Content :
        ```
        [
            {
                "id": 1,
                "name": "John",
                "surname": "Doe",
                "telephone": "123456789",
                "email": "johndoe@example.com",
                "role": "admin",
                "username": "johndoe",
                "password": <hashedpassword>,
                "company_id": null,
                "createdAt": "2022-01-01T00:00:00.000Z",
                "updatedAt": "2022-01-01T00:00:00.000Z",  
                "company": null
            }
        ]

        ```

* **Error Response:**

    * Status Code : `401` - If the user is company, It is unauthorized to access this endpoint.
    * Content :
        ```
        {
            "message": "Unauthorized"
        }
        ```
    **OR**
    * Status Code : `404` - If no users were found with the given parameters.
    * Content :
        ```
        {
            "message": "No users found with the given parameters"
        }
        ```

## Update User

This API endpoint updates an existing user with the given information in the request body.

* **Method:**

    `PUT`

* **URL:**

    `/user/:id`
    * if the user is admin or card to specific a user to update.

    `/user`
    * if the user is company, can only update itself.

* **Headers:**

    Authorization: `Bearer <jwt_token>` (required) - Access token obtained after successful authentication.

* **URL Parametes:**
    * id: `integer` - The id of the user to be updated.

* **Request Body:**

    * name: `string` - The first name of the user.
    * surname: `string` - The last name of the user.
    * telephone: `string` - The telephone of the user.
    * username: `string` - The username of the user.
    * password: `string` - The password of the user.

* **Example:**
    ```
    {
        "name": "Jane",
        "surname": "Doe",
        "telephone": "+123456789",
        "username": "janedoe",
        "password": "newsecretpassword"
    }
    ```
* **Success Response:**

    * Status Code : `200 OK`
    * Content :
        ```
        {
            "message" : "User updated successfully"
        }
        ```

* **Error Response:**

    * Status Code : `404` - If the user with the given id is not found.
    * Content :
        ```
        {
            "message": "User not found!"
        }
        ```

    **OR**

    * Status Code : `400` - If the request body is missing required fields or username already exists.
    * Content :
        ```
        {
            "message": "Error updating user"
        }
        ```

    **OR**

    * Status Code : `405` - If the request is made by a admin or card user and no id is provided in the request parameters.
    * Content :
        ```
        {
            "message": "Update user needs to provide an id"
        }

        ```

## Delete User

This API endpoint deletes a user with the given id, Only admin and card user are authorized to access.

* **Method:**

    `DELETE`

* **URL:**

    `/user/:id`

* **Headers:**

    Authorization: `Bearer <jwt_token>` (required) - Access token obtained after successful authentication.

* **URL Parametes:**
    * id: `integer(required)` - The id of the user to be deleted.

* **Success Response:**

    * Status Code : `200 OK`
    * Content :
        ```
        {
            "message" : "User deleted successfully"
        }
        ```
* **Error Response:**

    * Status Code : `401` - If the user is company, It is unauthorized to access this endpoint.
    * Content :
        ```
        {
            "message": "Unauthorized access"
        }
        ```

    **OR**

    * Status Code : `404` - If the user with the given id does not exist.
    * Content :
        ```
        {
            "message": "User not found"
        }
        ```

    **OR**

    * Status Code : `500` - If an error occurred while deleting the user.
    * Content :
        ```
        {
            "message": "Error deleting user"
        }

        ```