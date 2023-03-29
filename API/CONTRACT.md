
# Contract Api

This API is designed for managing contracts. Company users can only read their own contracts, while admin and card users have full access to all endpoints. All API endpoints require authentication, and unauthorized access will be rejected.


## Create Contract

  This API endpoint creates a new contract with the given information in the request body.

* **Method:**

  `POST`

* **URL:**

  `/contract`

* **Headers:**

    Authorization: `Bearer <jwt_token>` (required) - Access token obtained after successful authentication.


* **Request Body:**

    * number: `string(required)` - The name of the contract.
    * start_date: `string(required)` - The start date of the contract.
    * end_date: `string(required)` - The end date of the contract.
    * company_id: `string(required)` - The ID of the company associated with the contract.

* **Example:**

   ```
    {
        "number": "123456",
        "start_date": "2023-01-01",
        "end_date": "2023-12-31",
        "company_id": 1
    }
    ```
    

* **Success Response:**

    * Status Code : `200 OK`
    * Content :

        ```
        {
            "message" : "Contract created successfully"
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

    * Status Code : `402` - If a contract with the same number already exists.

        ```
        {
            "message": "Contract already exists!"
        }
        ```

    **OR**

    * Status Code : `403` - If the number field is not a number.

        ```
        {
            "message": "Telephone number should be a number!"
        }
        ```

    **OR**

    * Status Code : `404` - If the company_id field is not a number.

        ```
        {
            "message": "Company_id should be a number!"
        }
        ```

    **OR**

    * Status Code : `500` - If an error occurred while creating the contract.
    * Content :

        ```
        {
            "message": "Error creating company"
        }
        ```

## Get All Contract

This API endpoint returns a list of all contracts belonging to the authenticated user's company if the authenticated user is a company user, and a list of all contracts if the authenticated user is an admin or card user.

* **Method:**

  `GET`

* **URL:**

  `/contract`

* **Headers:**

    Authorization: `Bearer <jwt_token>` (required) - Access token obtained after successful authentication.

* **Success Response:**

    * Status Code : `200 OK`
    * Content :

        ```
        [    
            {        
                "id": 1,        
                "number": "11111",        
                "start_date": "2022-01-01",        
                "end_date": "2022-12-31",        
                "company_id": 1,        
                "createdAt": "2022-01-01T00:00:00.000Z",        
                "updatedAt": "2022-01-01T00:00:00.000Z",        
                "company": {            
                    "id": 1,            
                    "name": "Company One",            
                    "address": "123 Main St",            
                    "telephone": "555-555-5555",            
                    "createdAt": "2022-01-01T00:00:00.000Z",            
                    "updatedAt": "2022-01-01T00:00:00.000Z"        
                }    
            },    
            {        
                "id": 2,        
                "number": "22222",        
                "start_date": "2022-01-01",        
                "end_date": "2022-12-31",        
                "company_id": 1,        
                "createdAt": "2022-01-01T00:00:00.000Z",        
                "updatedAt": "2022-01-01T00:00:00.000Z",        
                "company": {            
                    "id": 1,            
                    "name": "Company One",            
                    "address": "123 Main St",            
                    "telephone": "555-555-5555",            
                    "createdAt": "2022-01-01T00:00:00.000Z",            
                    "updatedAt": "2022-01-01T00:00:00.000Z"        
                }    
            }
        ]
        ```
 
* **Error Response:**

    * Status Code : `401` - If the user is not authorized
    * Content :

        ```
        {
            "message": "Unauthorized"
        }
        ```

    **OR**

    * Status Code : `500` - If an error occurred while retrieving contracts
    * Content :

        ```
        {
            "message": "Server error"
        }
        ```
## Get Contract with parameters

This API endpoint gets a contract or contracts with all parameters provided in the query string.

* **Method:**

  `GET`

* **URL:**

  `/contract/search`

* **Headers:**

    Authorization: `Bearer <jwt_token>` (required) - Access token obtained after successful authentication.

* **Query parameters:**

    * id: `integer` - The id of the company.
    * name: `string` - The name of the company.
    * start_date: `date` - The start date of the contract.
    * end_date: `date` - The end date of the contract.
    * company_id: `integer` - The id of the company.

* **Example:**

    `/search?id=1&number=11111&start_date=2022-01-01&end_date=2022-12-31&company_id=1`

* **Success Response:**

    * Status Code : `200 OK`
    * Content :

        ```
        [      
            {        
                "id": 1,        
                "number": "111111",        
                "start_date": "2022-01-01T00:00:00.000Z",        
                "end_date": "2022-12-31T00:00:00.000Z",        
                "company_id": 1,        
                "createdAt": "2022-01-01T00:00:00.000Z",        
                "updatedAt": "2022-01-01T00:00:00.000Z",        
                "company": {            
                    "id": 1,            
                    "name": "ExampleCompany",            
                    "address": "123 Main St",            
                    "telephone": "1234567",            
                    "createdAt": "2022-01-01T00:00:00.000Z",            
                    "updatedAt": "2022-01-01T00:00:00.000Z"        
                }    
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

    * Status Code : `404` - If no contract found with the given parameters.
    * Content :

        ```
        {
            "message": "No contract found with the given parameters"
        }
        ```
## Update Company

This API endpoint updates a contract with the provided contract ID and data in the request body.

* **Method:**

    `PUT`

* **URL:**

    `/contract/:id`

* **Headers:**

    Authorization: `Bearer <jwt_token>` (required) - Access token obtained after successful authentication.

* **URL Parametes:**
    * id: `integer` - The id of the contract to be updated.

* **Request Body:**

    * number: `string` - The number of the contract.
    * start_date: `date` - The start date of the contract.
    * end_date: `date` - The end date of the contract.
    * company_id: `integer` - The ID of the company associated with the contract.

* **Example:**
    ```
    {
        "number": 12345,
        "start_date": "2022-01-01",
        "end_date": "2022-06-30",
        "company_id": 1
    }
    ```
* **Success Response:**

    * Status Code : `200 OK`
    * Content :
        ```
        {
            "message" : "Contract updated successfully"
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

    * Status Code : `404` - If the contract with the given id is not found.
    * Content :
        ```
        {
            "message": "Contract not found!"
        }
        ```

    **OR**

    * Status Code : `400` - If the request body is missing required fields or there was an error updating the contract.
    * Content :
        ```
        {
            "message": "Error updating contract"
        }
        ```

    **OR**

    * Status Code : `402` - If a contract with the same number already exists.
    * Content :
        ```
        {
            "message": "Contrat already exists!"
        }

        ```

    **OR**

    * Status Code : `403` - If number or company_id is not a number.
    * Content :
        ```
        {
            "message": "Number should be a number!"
        }

        ```
        OR
        ```
        {
            "message": "Company_id should be a number!"
        }

        ```
## Delete Contract

This API endpoint deletes a contract with the specified ID.

* **Method:**

    `DELETE`

* **URL:**

    `/contract/:id`

* **Headers:**

    Authorization: `Bearer <jwt_token>` (required) - Access token obtained after successful authentication.

* **URL Parametes:**
    * id: `integer(required)` - The id of the contract to be deleted.

* **Success Response:**

    * Status Code : `200 OK`
    * Content :
        ```
        {
            "message" : "Contract deleted successfully"
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

    * Status Code : `404` - If the contract with the given id is not found.
    * Content :
        ```
        {
            "message": "Contract not found"
        }
        ```