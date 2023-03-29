
# Employee Api

This API is designed for managing employees. All users have full access to all endpoints. All API endpoints require authentication, and unauthorized access will be rejected.


## Create Employee

  This API endpoint creates a new employee with the given information in the request body.

* **Method:**

  `POST`

* **URL:**

  `/employee`

* **Headers:**

    Authorization: `Bearer <jwt_token>` (required) - Access token obtained after successful authentication.


* **Request Body:**

    * name: `string(required)` - The name of the employee.
    * surname: `string(required)` - The surname of the employee.
    * number: `string(required)` - The number of the employee.
    * telephone: `string(required)` - The telephone number of the employee.
    * note: `string` - Additional note of the employee.contract.

* **Example:**

   ```
    {
        "name": "John",
        "surname": "Doe",
        "number": "123456",
        "telephone": "1234567890",
        "note": "Note for John Doe"
    }
    ```
    

* **Success Response:**

    * Status Code : `200 OK`
    * Content :

        ```
        {
            "message" : "Employee created successfully"
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

    * Status Code : `401` - If the user is neither admin nor card, and the note field is included in the request.

        ```
        {
            "message": "Unauthorized"
        }
        ```

    **OR**

    * Status Code : `402` - If an employee with the same number already exists.

        ```
        {
            "message": "Employee already exists!"
        }
        ```

    **OR**

    * Status Code : `403` - If an error occurred while creating the employee.

        ```
        {
            "message": "Cannot create employee at the moment!"
        }
        ```

    **OR**

    * Status Code : `404` - If the number or telephone fields are not a number.
    * Content:

        ```
        {
            "message": "Number should be a number!"
        }
        ```
        OR
    
        ```
        {
            "message": "Telephone number should be a number!"
        }
        ```
## Get All Employee

This API endpoint returns a list of all employees belonging to the authenticated user's company if the authenticated user is a company user, and a list of all employees if the authenticated user is an admin or card user.

* **Method:**

  `GET`

* **URL:**

  `/employee`

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
                "number": "00001",
                "telephone": "11111111",
                "note": null,
                "createby": 1,
                "createdAt": "2023-03-27T02:43:48.000Z",
                "updatedAt": "2023-03-27T02:43:48.000Z"
            },
            {
                "id": 2,
                "name": "Jane",
                "surname": "Smith",
                "number": "00002",
                "telephone": "2222222",
                "note": null,
                "createby": 2,
                "createdAt": "2023-03-27T02:44:32.000Z",
                "updatedAt": "2023-03-27T03:22:57.000Z"
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

    * Status Code : `500` - If an error occurred while retrieving employees.
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

  `/employee/search`

* **Headers:**

    Authorization: `Bearer <jwt_token>` (required) - Access token obtained after successful authentication.

* **Query parameters:**

    * id: `integer` - The id of the employee.
    * name: `string` - The name of the employee.
    * surname: `string` - The surname of the employee.
    * number: `integer` - The employee number.
    * telephone: `string` - The telephone number of the employee.
    * note: `string` - The note about the employee.

* **Example:**

    `/search?id=1&name=John&surname=Doe&number=1234&telephone=555-555-5555&note=employee%20note`

* **Success Response:**

    * Status Code : `200 OK`
    * Content :

        ```
        [          
            {                
                "id": 1,                
                "name": "John",                
                "surname": "Doe",                
                "number": 1234,                
                "telephone": "555-555-5555",                
                "note": "employee note",                
                "createdAt": "2022-01-01T00:00:00.000Z",                
                "updatedAt": "2022-01-01T00:00:00.000Z"        
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

    * Status Code : `404` - If no employee found with the given parameters.
    * Content :

        ```
        {
            "message": "No employee found with the given parameters"
        }
        ```
## Update Company

This API endpoint updates an employee with the provided employee ID and data in the request body.

* **Method:**

    `PUT`

* **URL:**

    `/employee/:id`

* **Headers:**

    Authorization: `Bearer <jwt_token>` (required) - Access token obtained after successful authentication.

* **URL Parametes:**
    * id: `integer` - The id of the employee to be updated.

* **Request Body:**

    * name: `string` - The name of the employee.
    * surname: `string` - The surname of the employee.
    * number: `integer` - The number of the employee.
    * telephone: `integer` - The telephone number of the employee.
    * note: `string` - The note of the employee.

* **Example:**
    ```
    {
        "name": "John",
        "surname": "Doe",
        "number": 123,
        "telephone": 456,
        "note": "Some notes."
    }
    ```
* **Success Response:**

    * Status Code : `200 OK`
    * Content :
        ```
        {
            "message" : "Employee updated successfully"
        }
        ```

* **Error Response:**

    * Status Code : `401` - If the user is company and not updated their own employee's company.
    * Content :
        ```
        {
            "message": "Unauthorized"
        }
        ```

    **OR**

    * Status Code : `404` - If the employee with the given id is not found.
    * Content :
        ```
        {
            "message": "Employee not found!"
        }
        ```

    **OR**

    * Status Code : `400` - If the request body is missing required fields or there was an error updating the employee.
    * Content :
        ```
        {
            "message": "Error updating employee"
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

    * Status Code : `403` - If number or telephone is not a number.
    * Content :
        ```
        {
            "message": "Number should be a number!"
        }

        ```
        OR
        ```
        {
            "message": "Telephone number should be a number!"
        }

        ```
## Delete Contract

This API endpoint deletes a contract with the specified ID.

* **Method:**

    `DELETE`

* **URL:**

    `/employee/:id`

* **Headers:**

    Authorization: `Bearer <jwt_token>` (required) - Access token obtained after successful authentication.

* **URL Parametes:**
    * id: `integer(required)` - The id of the employee to be deleted.

* **Success Response:**

    * Status Code : `200 OK`
    * Content :
        ```
        {
            "message" : "Employee deleted successfully"
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

    * Status Code : `404` - If the employee with the given id is not found.
    * Content :
        ```
        {
            "message": "Employee not found"
        }
        ```