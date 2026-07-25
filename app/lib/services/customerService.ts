// app/lib/services/customerService.ts

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  totalSpent: number;
  invoices: number;
  status: "active" | "inactive";
  createdAt: string;
}

export interface CustomerInvoice {
  id: number;
  invoiceNumber: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  date: string;
}

const mockCustomers: Customer[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    company: "Acme Corp",
    totalSpent: 1250,
    invoices: 5,
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 (555) 987-6543",
    company: "TechStart Inc",
    totalSpent: 850,
    invoices: 3,
    status: "active",
    createdAt: "2024-02-20",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    phone: "+1 (555) 456-7890",
    company: "Creative Solutions",
    totalSpent: 3200,
    invoices: 12,
    status: "inactive",
    createdAt: "2023-11-10",
  },
];

// Fetch all customers
export async function fetchCustomers(): Promise<Customer[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCustomers);
    }, 500);
  });
}

// Fetch one customer
export async function fetchCustomerById(
  id: number
): Promise<Customer | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCustomers.find((c) => c.id === id));
    }, 500);
  });
}

// Fetch customer invoices
export async function fetchCustomerInvoices(
  customerId: number
): Promise<CustomerInvoice[]> {
  const mockInvoices: CustomerInvoice[] = [
    {
      id: 1,
      invoiceNumber: "INV-001",
      amount: 250,
      status: "paid",
      date: "2024-06-15",
    },
    {
      id: 2,
      invoiceNumber: "INV-002",
      amount: 350,
      status: "pending",
      date: "2024-06-20",
    },
    {
      id: 3,
      invoiceNumber: "INV-003",
      amount: 150,
      status: "overdue",
      date: "2024-05-10",
    },
  ];

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockInvoices);
    }, 500);
  });
}

// Create customer
export async function createCustomer(
  data: Omit<Customer, "id" | "totalSpent" | "invoices" | "createdAt">
): Promise<Customer> {
  const newCustomer: Customer = {
    id: mockCustomers.length + 1,
    ...data,
    totalSpent: 0,
    invoices: 0,
    createdAt: new Date().toISOString().split("T")[0],
  };

  mockCustomers.push(newCustomer);

  return new Promise((resolve) => {
    setTimeout(() => resolve(newCustomer), 500);
  });
}

// Update customer
export async function updateCustomer(
  id: number,
  data: Partial<Customer>
): Promise<Customer> {
  const index = mockCustomers.findIndex((c) => c.id === id);

  if (index === -1) {
    throw new Error("Customer not found");
  }

  mockCustomers[index] = {
    ...mockCustomers[index],
    ...data,
  };

  return new Promise((resolve) => {
    setTimeout(() => resolve(mockCustomers[index]), 500);
  });
}

// Delete customer
export async function deleteCustomer(
  id: number
): Promise<{ success: boolean }> {
  const index = mockCustomers.findIndex((c) => c.id === id);

  if (index === -1) {
    throw new Error("Customer not found");
  }

  mockCustomers.splice(index, 1);

  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true }), 500);
  });
}