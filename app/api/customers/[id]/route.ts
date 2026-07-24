// app/api/customers/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';

// GET customer by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    // Mock data - replace with your database
    const customer = {
      id: id,
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      company: "Acme Corp",
      totalSpent: 1250.00,
      invoices: 5,
      status: 'active' as const,
      createdAt: "2024-01-15",
      notes: "Key decision maker. Prefers email communication."
    };

    return NextResponse.json(customer);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch customer' },
      { status: 500 }
    );
  }
}

// PUT update customer
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    
    const updatedCustomer = {
      id: id,
      ...body,
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json(updatedCustomer);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update customer' },
      { status: 500 }
    );
  }
}

// DELETE customer
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    return NextResponse.json({ 
      message: `Customer ${id} deleted successfully` 
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete customer' },
      { status: 500 }
    );
  }
}