import { Employee } from '../../types/employee';

/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - position
 *         - hireDate
 *         - isActive
 *       properties:
 *         id:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         phone:
 *           type: string
 *         address:
 *           type: string
 *         position:
 *           type: string
 *         hireDate:
 *           type: string
 *         isActive:
 *           type: boolean
 */

let employees: Employee[] = [];

/**
 * @swagger
 * /api/employees:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       200:
 *         description: The created employee
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 */
export async function createEmployee(employee: Omit<Employee, 'id'>): Promise<Employee> {
  const newEmployee: Employee = {
    id: Math.random().toString(36).substring(2, 15), // Generate a random ID
    ...employee,
  };
  employees.push(newEmployee);
  return newEmployee;
}

/**
 * @swagger
 * /api/employees/{id}:
 *   get:
 *     summary: Get an employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Employee ID
 *     responses:
 *       200:
 *         description: Employee found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 */
export async function getEmployee(id: string): Promise<Employee | undefined> {
  return employees.find((employee) => employee.id === id);
}

/**
 * @swagger
 * /api/employees/{id}:
 *   put:
 *     summary: Update an employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Employee ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       200:
 *         description: The updated employee
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 */
export async function updateEmployee(id: string, updates: Partial<Employee>): Promise<Employee | undefined> {
  const employeeIndex = employees.findIndex((employee) => employee.id === id);
  if (employeeIndex === -1) {
    return undefined;
  }

  employees[employeeIndex] = { ...employees[employeeIndex], ...updates };
  return employees[employeeIndex];
}

/**
 * @swagger
 * /api/employees/{id}:
 *   delete:
 *     summary: Delete an employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Employee ID
 *     responses:
 *       200:
 *         description: Employee deleted
 */
export async function deleteEmployee(id: string): Promise<boolean> {
  employees = employees.filter((employee) => employee.id !== id);
  return true;
}

/**
 * @swagger
 * /api/employees:
 *   get:
 *     summary: List all employees
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: List of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 */
export async function listEmployees(): Promise<Employee[]> {
    return employees;
}
