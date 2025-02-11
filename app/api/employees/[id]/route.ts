import { NextResponse } from 'next/server';
import { Employee } from '@/types/employee';

// Mock employee data (replace with database calls)
const employees: Employee[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    position: 'Barber',
    hireDate: '2024-01-01',
    isActive: true,
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    position: 'Stylist',
    hireDate: '2024-02-15',
    isActive: true,
  },
];

// Helper function to find an employee by ID
function findEmployeeById(id: string): Employee | undefined {
  return employees.find((employee) => employee.id === id);
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const employee = findEmployeeById(id);

    if (!employee) {
      return NextResponse.json({ error: 'Employee not found' }, { status: 404 });
    }

    return NextResponse.json(employee);
  } catch (error) {
    console.error('Error getting employee:', error);
    return NextResponse.json({ error: 'Failed to get employee' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const employee = findEmployeeById(id);

    if (!employee) {
      return NextResponse.json({ error: 'Employee not found' }, { status: 404 });
    }

    const updatedEmployeeData = await request.json();
    // In a real application, you would update the employee data in the database here
    // For this example, we'll just return the updated data
    const updatedEmployee = { ...employee, ...updatedEmployeeData };

    return NextResponse.json(updatedEmployee);
  } catch (error) {
    console.error('Error updating employee:', error);
    return NextResponse.json({ error: 'Failed to update employee' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const employee = findEmployeeById(id);

    if (!employee) {
      return NextResponse.json({ error: 'Employee not found' }, { status: 404 });
    }

    // In a real application, you would delete the employee from the database here

    return NextResponse.json({ message: 'Employee deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting employee:', error);
    return NextResponse.json({ error: 'Failed to delete employee' }, { status: 500 });
  }
}
