"use client";

import { fetchCustomers } from '@/app/lib/services/customerService';

export interface Invoice {
  id: number;
  customerId: number;
  name: string;
  email: string;
  image_url: string;
  amount: number;
  status: string; // CHANGED: Was 'paid' | 'pending', now just 'string'
  date: string;
}

const STORAGE_KEY = 'app_invoices';

export async function fetchInvoices(): Promise<Invoice[]> {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && stored !== '[]') {
    return JSON.parse(stored);
  }
  
  const initial = [
    { id: 1, customerId: 1, name: 'Michael Novotny', email: 'michael@novotny.com', image_url: '/customers/michael-novotny.png', amount: 40000, status: 'paid', date: '2024-12-15' },
    { id: 2, customerId: 2, name: 'John Doe', email: 'john@example.com', image_url: '/customers/amy-burns.png', amount: 25000, status: 'paid', date: '2024-08-15' },
  ];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  return initial;
}

export async function fetchInvoiceById(id: number): Promise<Invoice> {
  const invoices = await fetchInvoices();
  const invoice = invoices.find((inv) => inv.id === id);
  if (!invoice) {
    throw new Error("Invoice not found");
  }
  return invoice;
}

export async function deleteInvoice(id: number): Promise<void> {
  const invoices = await fetchInvoices();
  const filtered = invoices.filter((inv) => inv.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export async function createInvoice(data: Omit<Invoice, 'id' | 'date'>): Promise<Invoice> {
  const invoices = await fetchInvoices();
  
  let customerName = 'Unknown Customer';
  let customerEmail = 'no-email@example.com';
  let customerImage = '';
  
  try {
    const customers = await fetchCustomers();
    const foundCustomer = customers.find((c) => c.id === data.customerId);
    if (foundCustomer) {
      customerName = foundCustomer.name;
      customerEmail = foundCustomer.email;
      customerImage = foundCustomer.photo || '';
    }
  } catch (error) {
    console.error("Failed to find customer:", error);
  }
  
  const newInvoice: Invoice = {
    ...data,
    id: Date.now(),
    name: customerName,
    email: customerEmail,
    image_url: customerImage,
    date: new Date().toISOString().split('T')[0],
  };
  invoices.push(newInvoice);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices));
  return newInvoice;
}

export async function updateInvoice(id: number, data: Partial<Invoice>): Promise<Invoice> {
  const invoices = await fetchInvoices();
  const index = invoices.findIndex((inv) => inv.id === id);
  if (index !== -1) {
    invoices[index] = { ...invoices[index], ...data };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices));
    return invoices[index];
  }
  throw new Error("Invoice not found");
}