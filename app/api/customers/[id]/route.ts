import { NextRequest, NextResponse } from 'next/server';

// GET customer by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const customer = {
      id: parseInt(id),
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      company: "Acme Corp",
      totalSpent: 1250.0,
      invoices: 5,
      status: "active" as const,
      createdAt: "2024-01-15",
      notes: "Key decision maker. Prefers email communication.",
    };

    return NextResponse.json(customer);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch customer" },
      { status: 500 }
    );
  }
}

// PUT update customer
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updatedCustomer = {
      id: parseInt(id),
      ...body,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(updatedCustomer);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update customer" },
      { status: 500 }
    );
  }
}

// DELETE customer
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    return NextResponse.json({
      message: `Customer ${id} deleted successfully`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete customer" },
      { status: 500 }
    );
  }
}