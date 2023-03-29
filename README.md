
# API Documentation

This repository contains the following APIs:

* [Archive API](https://github.com/BeastBear/contract-emp-backend/blob/main/API/ARCHIVE.mde)
* [Company API](https://github.com/BeastBear/contract-emp-backend/blob/main/API/COMPANY.md)
* [Contract API](https://github.com/BeastBear/contract-emp-backend/blob/main/API/CONTRACT.md)
* [Employee API](https://github.com/BeastBear/contract-emp-backend/blob/main/API/EMPLOYEE.md)
* [User API](https://github.com/BeastBear/contract-emp-backend/blob/main/API/USER.md)

Each API has its own README file with detailed documentation on how to use the endpoints.

## Authentication

All API endpoints require authentication using JSON Web Tokens (JWT). Users must include their JWT token in the Authorization header of each request in the following format:

```
Authorization: Bearer <token>
```

## Error Handling

If an error occurs, the API will return a JSON response with an error property and a status code indicating the type of error.

For example:

```
{
  "message": "Invalid credentials"
}
```

## Feedback

If you have any feedback or suggestions for improvement, please create an issue in the relevant API repository.