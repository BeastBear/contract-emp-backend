
# Company Api

This API is designed for managing company. Company users can read, and update their own information, while admin and card users have full access to all endpoints. All API endpoints require authentication, and unauthorized access will be rejected.


## Create Company

  This API endpoint creates a new company with the given information in the request body.

* **Method:**

  `POST`

* **URL:**

  `/company`

* **Headers:**

    Authorization: `Bearer <jwt_token>` (required) - Access token obtained after successful authentication.


* **Request Body:**

    * name: `string(required)` - The name of the company.
    * address: `string(required)` - The address of the company.
    * telephone: `string(required)` - The telephone number of the company.

* **Example:**

   ```
    {
        "name": "Example Company",
        "address": "123 Main St, Anytown USA",
        "telephone": "(123) 456-7890"
    }
    ```
    

* **Success Response:**

    * Status Code : `200 OK`
    * Content :

        ```
        {
            "message" : "Company created successfully"
        }
        ```
 
* **Error Response:**

    * Status Code : `400` - If any required fields are missing.
    * Content :

        ```
        {
            "message": "Please fill out the <field> field"
        }
        ```

    **OR**

    * Status Code : `401` - If the user is company, It is unauthorized to access this endpoint.

        ```
        {
            "message": "Unauthorized"
        }
        ```

    **OR**

    * Status Code : `500` - If an error occurred while creating the company.
    * Content :

        ```
        {
            "message": "Error creating company"
        }
        ```
## Get Company Info

This API endpoint retrieves the company information of a user, based on their user id.

* **Method:**

  `GET`

* **URL:**

  `/company/info`

* **Headers:**

    Authorization: `Bearer <jwt_token>` (required) - Access token obtained after successful authentication.

* **Success Response:**

    * Status Code : `200 OK`
    * Content :

        ```
        {
            "name": "Example Company",
            "address": "123 Main St",
            "telephone": "555-1234",
            "createdAt": "2022-01-01T00:00:00.000Z",
            "updatedAt": "2022-01-01T00:00:00.000Z",
        }

        ```
 
* **Error Response:**

    * Status Code : `401` - If the user is an admin or a card user.
    * Content :

        ```
        {
            "message": "Unauthorized"
        }
        ```

    **OR**

    * Status Code : `404` - If the company is not found.

        ```
        {
            "message": "Company not found"
        }
        ```

    **OR**

    * Status Code : `500` - If an error occurred while retrieving the company information.
    * Content :

        ```
        {
            "message": "Server error"
        }
        ```
## Get All Companies

This API endpoint returns a list of all companies if the authenticated user is an admin or card user.

* **Method:**

  `GET`

* **URL:**

  `/company`

* **Headers:**

    Authorization: `Bearer <jwt_token>` (required) - Access token obtained after successful authentication.

* **Success Response:**

    * Status Code : `200 OK`
    * Content :

        ```
        [
            {
                "id": 1,
                "name": "Company One",
                "address": "123 Main St",
                "telephone": "555-555-5555",
                "createdAt": "2022-01-01T00:00:00.000Z",
                "updatedAt": "2022-01-01T00:00:00.000Z"
            },
            {
                "id": 2,
                "name": "Company Two",
                "address": "456 Main St",
                "telephone": "555-555-5555",
                "createdAt": "2022-01-01T00:00:00.000Z",
                "updatedAt": "2022-01-01T00:00:00.000Z"
            }
        ]
        ```
 
* **Error Response:**

    * Status Code : `401` - If the authenticated user is not an admin or card user.
    * Content :

        ```
        {
            "message": "Unauthorized"
        }
        ```

    **OR**

    * Status Code : `500` - If an error occurred while retrieving companies
    * Content :

        ```
        {
            "message": "Server error"
        }
        ```
## Get Company with parameters

This API endpoint gets a company or companies with all parameters provided in the query string.

* **Method:**

  `GET`

* **URL:**

  `/company/search`

* **Headers:**

    Authorization: `Bearer <jwt_token>` (required) - Access token obtained after successful authentication.

* **Query parameters:**
    * id: `integer` - The id of the company.
    * name: `string` - The name of the company.
    * telephone: `string` - The telephone number of the company.

* **Example:**

    `/search?id=1&name=ExampleCompany&telephone=1234567`

* **Success Response:**

    * Status Code : `200 OK`
    * Content :

        ```
        [
            {
                "id": 1,
                "name": "ExampleCompany",
                "address": "123 Main St",
                "telephone": "1234567",
                "createdAt": "2022-01-01T00:00:00.000Z",
                "updatedAt": "2022-01-01T00:00:00.000Z"
            }
        ]

        ```
 
* **Error Response:**

    * Status Code : `401` - If the authenticated user is not an admin or card user.
    * Content :

        ```
        {
            "message": "Unauthorized"
        }
        ```

    **OR**

    * Status Code : `404` - If no companies found with the given parameters.
    * Content :

        ```
        {
            "message": "No companies found with the given parameters"
        }
        ```
## Update Company

This API endpoint updates an existing company with the given information in the request body.

* **Method:**

    `PUT`

* **URL:**

    `/company/:id`
    * if the user is admin or card to specific a user to update.

    `/company`
    * if the user is company, can only update itself.

* **Headers:**

    Authorization: `Bearer <jwt_token>` (required) - Access token obtained after successful authentication.

* **URL Parametes:**
    * id: `integer` - The id of the company to be updated.

* **Request Body:**

    * name: `string` - The first name of the user.
    * address: `string` - The address of the company.
    * telephone: `string` - The telephone of the company.
    * username: `string` - The username of the user.
    * password: `string` - The password of the user.

* **Example:**
    ```
    {
        "name": "ACME Inc.",
        "address": "1234 Main Street, Anytown USA",
        "telephone": "+123456789"
    }
    ```
* **Success Response:**

    * Status Code : `200 OK`
    * Content :
        ```
        {
            "message" : "Company updated successfully"
        }
        ```

* **Error Response:**

    * Status Code : `404` - If the company with the given id is not found.
    * Content :
        ```
        {
            "message": "Company not found!"
        }
        ```

    **OR**

    * Status Code : `400` - If the request body is missing required fields or there was an error updating the company.
    * Content :
        ```
        {
            "message": "Error updating company"
        }
        ```

    **OR**

    * Status Code : `402` - If the company name already exists in the database.
    * Content :
        ```
        {
            "message": "Company already exists!"
        }

        ```

    **OR**

    * Status Code : `403` - If the request body contains an invalid telephone number.
    * Content :
        ```
        {
            "message": "Telephone number should be a number!"
        }

        ```
## Delete Company

This API endpoint deletes an existing company.

* **Method:**

    `DELETE`

* **URL:**

    `/company/:id`

* **Headers:**

    Authorization: `Bearer <jwt_token>` (required) - Access token obtained after successful authentication.

* **URL Parametes:**
    * id: `integer(required)` - The id of the company to be deleted.

* **Success Response:**

    * Status Code : `200 OK`
    * Content :
        ```
        {
            "message" : "Company deleted successfully"
        }
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

    * Status Code : `404` - If the company with the given id is not found.
    * Content :
        ```
        {
            "message": "Company not found"
        }
        ```