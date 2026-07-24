// app/lib/services/customerService.ts

// Mock data - we'll connect to real API later
const mockCustomers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    company: "Acme Corp",
    totalSpent: 1250.00,
    invoices: 5,
    status: "active" as const,
    createdAt: "2024-01-15"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 (555) 987-6543",
    company: "TechStart Inc",
    totalSpent: 850.00,
    invoices: 3,
    status: "active" as const,
    createdAt: "2024-02-20"
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    phone: "+1 (555) 456-7890",
    company: "Creative Solutions",
    totalSpent: 3200.00,
    invoices: 12,
    status: "inactive" as const,
    createdAt: "2023-11-10"
  }
];

// Fetch all customers
export async function fetchCustomers() {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCustomers);
    }, 500);
  });
}

// Fetch single customer by ID
export async function fetchCustomerById(id: number) {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const customer = mockCustomers.find(c => c.id === id);
      if (customer) {
        resolve(customer);
      } else {
        reject(new Error('Customer not found'));
      }
    }, 500);
  });
}

// Fetch customer invoices
export async function fetchCustomerInvoices(customerId: number) {
  // Mock invoice data
  const mockInvoices = [
    {
      id: 1,
      invoiceNumber: "INV-001",
      amount: 250.00,
      status: "paid" as const,
      date: "2024-06-15"
    },
    {
      id: 2,
      invoiceNumber: "INV-002",
      amount: 350.00,
      status: "pending" as const,
      date: "2024-06-20"
    },
    {
      id: 3,
      invoiceNumber: "INV-003",
      amount: 150.00,
      status: "overdue" as const,
      date: "2024-05-10"
    }
  ];

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockInvoices);
    }, 500);
  });
}

// Create new customer
export async function createCustomer(data: any) {
  const newCustomer = {
    id: mockCustomers.length + 1,
    ...data,
    totalSpent: 0,
    invoices: 0,
    createdAt: new Date().toISOString().split('T')[0]
  };
  
  return new Promise((resolve) => {
    setTimeout(() => {
      mockCustomers.push(newCustomer);
      resolve(newCustomer);
    }, 500);
  });
}

// Update customer
export async function updateCustomer(id: number, data: any) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockCustomers.findIndex(c => c.id === id);
      if (index !== -1) {
        mockCustomers[index] = { ...mockCustomers[index], ...data };
        resolve(mockCustomers[index]);
      } else {
        reject(new Error('Customer not found'));
      }
    }, 500);
  });
}

// Delete customer
export async function deleteCustomer(id: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockCustomers.findIndex(c => c.id === id);
      if (index !== -1) {
        mockCustomers.splice(index, 1);
        resolve({ success: true });
      } else {
        reject(new Error('Customer not found'));
      }
    }, 500);
  });
}