
# Archive Api

This API is designed for managing archives of employee contracts. Company users can only read their own archives, while admin and card users have full access to all endpoints. All API endpoints require authentication, and unauthorized access will be rejected.


## Create Archives

This API endpoint creates a new archive with the given information in the request body..

* **Method:**

  `POST`

* **URL:**

  `/archive`

* **Headers:**

    Authorization: `Bearer <jwt_token>` (required) - Access token obtained after successful authentication.


* **Request Body:**

    * employee_id: `integer(required)` - The ID of the employee associated with the archive.
    * contract_id: `integer(required)` - The ID of the contract associated with the archive.
    * department1: `string` - The first department associated with the archive.
    * department2: `string` - The second department associated with the archive.
    * department3: `string` - The third department associated with the archive.
    * remark: `string` - Additional remark for the archive.

* **Example:**

   ```
    {
        "employee_id": 1,
        "contract_id": 2,
        "department1": "Department A",
        "department2": "Department B",
        "department3": "Department C",
        "remark": "Remark for Archive"
    }
    ```
    

* **Success Response:**

    * Status Code : `200 OK`
    * Content :

        ```
        {
            "message" : "Archive created successfully"
        }
        ```
 
* **Error Response:**

    * Status Code : `401` - If the user is neither admin nor card.

        ```
        {
            "message": "Unauthorized"
        }
        ```

    **OR**

    * Status Code : `402` - If the employee_id or contract_id field is not a number.

        ```
        {
            "message": "Employee_id should be a number!"
        }
        ```
        OR
        ```
        {
            "message": "Contract_id should be a number!"
        }
        ```

    **OR**

    * Status Code : `403` - If an error occurred while creating the archive.

        ```
        {
            "message": "Cannot create archive at the moment!"
        }
        ```
## Get All Employee

This API endpoint returns a list of all employees belonging to the authenticated user's company if the authenticated user is a company user, and a list of all employees if the authenticated user is an admin or card user.

* **Method:**

  `GET`

* **URL:**

  `/archives`

* **Headers:**

    Authorization: `Bearer <jwt_token>` (required) - Access token obtained after successful authentication.

* **Success Response:**

    * Status Code : `200 OK`
    * Content :

        ```
        [
            {
                "employee_id": 1,
                "contract_id": 1,
                "department1": null,
                "department2": null,
                "department3": null,
                "remark": null,
                "createdAt": "2023-03-27T03:48:19.000Z",
                "updatedAt": "2023-03-27T03:48:19.000Z",
                "employee": {
                    "id": 1,
                    "name": "employee1",
                    "surname": "eeyolpme1",
                    "number": "00001",
                    "telephone": "11111111",
                    "note": null,
                    "createby": 1,
                    "createdAt": "2023-03-27T02:43:48.000Z",
                    "updatedAt": "2023-03-27T02:43:48.000Z"
                },
                "contract": {
                    "id": 1,
                    "number": "111",
                    "start_date": "2023-01-01",
                    "end_date": "2024-01-01",
                    "company_id": 1,
                    "createdAt": "2023-03-26T10:15:21.000Z",
                    "updatedAt": "2023-03-26T10:36:42.000Z",
                    "company": {
                        "id": 1,
                        "name": "company1",
                        "address": "11/111",
                        "telephone": "111111111",
                        "createdAt": "2023-03-25T10:14:37.000Z",
                        "updatedAt": "2023-03-27T05:35:09.000Z"
                    }
                },
            ...
        ]
        ```
 
* **Error Response:**

    * Status Code : `401` - If the user is not authorized to access this endpoint.
    * Content :
        ```
        {
            "message": "Unauthorized"
        }
        ```

    **OR**

    * Status Code : `500` - If an error occurred while retrieving archives.
    * Content :

        ```
        {
            "message": "Server error"
        }
        ```
## Get Employees with parameters

This API endpoint retrieves employees based on the provided parameters in the query string.

* **Method:**

  `GET`

* **URL:**

  `/archive/search`

* **Headers:**

    Authorization: `Bearer <jwt_token>` (required) - Access token obtained after successful authentication.

* **Query parameters:**

    * id: `integer` - The id of the archive.
    * employee_id: `integer` - The id of the employee.
    * contract_id: `integer` - The id of the contract.
    * department1: `string` - The first department of the employee.
    * department2: `string` - The second department of the employee.
    * department3: `string` - The third department of the employee.
    * remark: `string` - The remark about the archive.

* **Example:**

    `/search?id=1&employee_id=1&contract_id=1&department1=IT&department2=Software%20Engineering&department3=Backend&remark=archive%20remark`

* **Success Response:**

    * Status Code : `200 OK`
    * Content :

        ```
        [              
            {                                               
                "id": 1,
                "employee_id": 1,                        
                "contract_id": 1,                        
                "department1": "IT",                        
                "department2": "Software Engineering",                        
                "department3": "Backend",                        
                "remark": "archive remark",                        
                "createdAt": "2022-01-01T00:00:00.000Z",                        
                "updatedAt": "2022-01-01T00:00:00.000Z",        
                "employee": {            
                    "id": 1,            
                    "name": "John",            
                    "surname": "Doe",            
                    "number": 1234,            
                    "telephone": "555-555-5555",            
                    "note": "employee note",            
                    "createdAt": "2022-01-01T00:00:00.000Z",            
                    "updatedAt": "2022-01-01T00:00:00.000Z"        
                },        
                "contract": {            
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
                }    
            }
        ]
        ```
 
* **Error Response:**

    * Status Code : `401` - If the user is not authorized to access this endpoint.
    * Content :
        ```
        {
            "message": "Unauthorized"
        }
        ```

    **OR**

    * Status Code : `404` - If no archive found with the given parameters.
    * Content :

        ```
        {
            "message": "No employee found with the given parameters"
        }
        ```
## Update Archive

This API endpoint updates an archive with the provided ID and data in the request body.

* **Method:**

    `PUT`

* **URL:**

    `/archive/:id`

* **Headers:**

    Authorization: `Bearer <jwt_token>` (required) - Access token obtained after successful authentication.

* **URL Parametes:**
    * id: `integer` - The id of the archive to be updated.

* **Request Body:**

    * employee_id: `integer` - The id of the employee.
    * contract_id: `integer` - The id of the contract.
    * department1: `string` - The department name 1.
    * department2: `string` - The department name 2.
    * department3: `string` - The department name 3.
    * remark: `string` - The remark.

* **Example:**
    ```
    {
        "employee_id": 1,
        "contract_id": 2,
        "department1": "HR",
        "department2": "Payroll",
        "department3": "Operations",
        "remark": "Some remarks."
    }
    ```
* **Success Response:**

    * Status Code : `200 OK`
    * Content :
        ```
        {
            "message" : "Archive updated successfully"
        }
        ```

* **Error Response:**

    * Status Code : `401` - If the user is not admin or card.
    * Content :
        ```
        {
            "message": "Unauthorized"
        }
        ```

    **OR**

    * Status Code : `404` - If the archive with the given id is not found.
    * Content :
        ```
        {
            "message": "Archive not found!"
        }
        ```

    **OR**

    * Status Code : `400` - If the request body is missing required fields or there was an error updating the archive.
    * Content :
        ```
        {
            "message": "Error updating archive"
        }
        ```

    **OR**

    * Status Code : `403` - If employee_id or contract_id is not a number.
    * Content :
        ```
        {
            "message": "Employee_id should be a number!"
        }

        ```
        OR
        ```
        {
            "message": "Contract_id should be a number!"
        }

        ```
## Delete Archive

This API endpoint deletes a archive with the specified ID.

* **Method:**

    `DELETE`

* **URL:**

    `/archive/:id`

* **Headers:**

    Authorization: `Bearer <jwt_token>` (required) - Access token obtained after successful authentication.

* **URL Parametes:**
    * id: `integer(required)` - The id of the archive to be deleted.

* **Success Response:**

    * Status Code : `200 OK`
    * Content :
        ```
        {
            "message" : "Archive deleted successfully"
        }
        ```
* **Error Response:**

    * Status Code : `401` - If the user is not admin or card.
    * Content :
        ```
        {
            "message": "Unauthorized"
        }
        ```

    **OR**

    * Status Code : `404` - If the archive with the given id is not found.
    * Content :
        ```
        {
            "message": "Archive not found"
        }
        ```