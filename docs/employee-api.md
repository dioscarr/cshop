# Employee Management API

## Overview

This API allows you to manage employee information, including creating, retrieving, updating, and deleting employee records.

## Endpoints

### 1. Create Employee

-   **Endpoint:** `POST /employees`
-   **Description:** Creates a new employee record.
-   **Request Body:**

    ```json
    {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "phone": "123-456-7890",
      "address": "123 Main St",
      "position": "Software Engineer",
      "hireDate": "2023-01-01",
      "isActive": true
    }
    ```

-   **Response:**

    ```json
    {
      "id": "unique-employee-id",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "phone": "123-456-7890",
      "address": "123 Main St",
      "position": "Software Engineer",
      "hireDate": "2023-01-01",
      "isActive": true
    }
    ```

### 2. Get Employee

-   **Endpoint:** `GET /employees/{id}`
-   **Description:** Retrieves an employee record by ID.
-   **Response:**

    ```json
    {
      "id": "unique-employee-id",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "phone": "123-456-7890",
      "address": "123 Main St",
      "position": "Software Engineer",
      "hireDate": "2023-01-01",
      "isActive": true
    }
    ```

### 3. Update Employee

-   **Endpoint:** `PUT /employees/{id}`
-   **Description:** Updates an existing employee record.
-   **Request Body:**

    ```json
    {
      "firstName": "Jane",
      "lastName": "Doe",
      "position": "Senior Software Engineer"
    }
    ```

-   **Response:**

    ```json
    {
      "id": "unique-employee-id",
      "firstName": "Jane",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "phone": "123-456-7890",
      "address": "123 Main St",
      "position": "Senior Software Engineer",
      "hireDate": "2023-01-01",
      "isActive": true
    }
    ```

### 4. Delete Employee

-   **Endpoint:** `DELETE /employees/{id}`
-   **Description:** Deletes an employee record.
-   **Response:**

    ```json
    {
     "success": true
    }
    ```
    
### 5. List Employees

-   **Endpoint:** `GET /employees`
-   **Description:** Retrieves a list of all employees.
-   **Response:**

    ```json
    [
        {
            "id": "unique-employee-id-1",
            "firstName": "John",
            "lastName": "Doe",
            "email": "john.doe@example.com",
            "phone": "123-456-7890",
            "address": "123 Main St",
            "position": "Software Engineer",
            "hireDate": "2023-01-01",
            "isActive": true
        },
        {
            "id": "unique-employee-id-2",
            "firstName": "Jane",
            "lastName": "Doe",
            "email": "jane.doe@example.com",
            "phone": "987-654-3210",
            "address": "456 Elm St",
            "position": "Senior Software Engineer",
            "hireDate": "2022-05-15",
            "isActive": true
        }
    ]
    ```
