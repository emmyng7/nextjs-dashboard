"use client";

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  address?: string;
  photo?: string; // This will now hold the Base64 image
  totalSpent: number;
  invoices: number;
  status: 'active' | 'inactive';
  createdAt: string;
}

const STORAGE_KEY = 'app_customers';

export async function fetchCustomers(): Promise<Customer[]> {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return [];
}

export async function createCustomer(data: Omit<Customer, 'id' | 'totalSpent' | 'invoices' | 'createdAt'>): Promise<Customer> {
  const customers = await fetchCustomers();
  const newCustomer: Customer = {
    ...data,
    id: Date.now(),
    totalSpent: 0,
    invoices: 0,
    createdAt: new Date().toISOString(),
  };
  customers.push(newCustomer);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
  return newCustomer;
}

export async function updateCustomer(id: number, data: Partial<Customer>): Promise<Customer> {
  const customers = await fetchCustomers();
  const index = customers.findIndex((c) => c.id === id);
  if (index !== -1) {
    customers[index] = { ...customers[index], ...data };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
    return customers[index];
  }
  throw new Error("Customer not found");
}

export async function deleteCustomer(id: number): Promise<void> {
  const customers = await fetchCustomers();
  const filtered = customers.filter((c) => c.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}