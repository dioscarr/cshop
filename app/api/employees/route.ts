import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
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

export async function GET() {
  try {
    // In a real application, you would fetch data from a database here
    return NextResponse.json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    return NextResponse.json({ error: 'Failed to fetch employees' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const employeeData = await request.json();

    // In a real application, you would save the data to a database here
    // and generate a unique ID for the new employee
    const { data, error } = await supabase
      .from('employees')
      .insert([employeeData])
      .select()
      .single();

    if (error) {
      console.error('Error creating employee:', error);
      return NextResponse.json({ error: 'Failed to create employee' }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 }); // 201 Created
  } catch (error) {
    console.error('Error creating employee:', error);
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
