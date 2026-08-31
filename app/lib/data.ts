import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';

// NOTE: We removed 'postgres' and the 'sql' line entirely. 
// This makes it safe to import into Client Components without crashing.

export async function fetchRevenue() {
  try {
    // Hardcoded demo data for the chart
    const revenue = [
      { month: 'Jan', revenue: 2000 },
      { month: 'Feb', revenue: 1800 },
      { month: 'Mar', revenue: 2200 },
      { month: 'Apr', revenue: 2500 },
      { month: 'May', revenue: 2300 },
      { month: 'Jun', revenue: 3200 },
      { month: 'Jul', revenue: 3500 },
      { month: 'Aug', revenue: 3700 },
      { month: 'Sep', revenue: 2500 },
      { month: 'Oct', revenue: 2800 },
      { month: 'Nov', revenue: 3000 },
      { month: 'Dec', revenue: 4800 },
    ];

    return revenue;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  try {
    const data = [
      { id: '1', name: 'Michael Novotny', email: 'michael@novotny.com', image_url: '/customers/michael-novotny.png', amount: 40000 },
      { id: '2', name: 'Lee Robinson', email: 'lee@robinson.com', image_url: '/customers/lee-robinson.png', amount: 2000 },
      { id: '3', name: 'Balazs Orban', email: 'balazs@orban.com', image_url: '/customers/balazs-orban.png', amount: 10000 },
      { id: '4', name: 'Delba de Oliveira', email: 'delba@oliveira.com', image_url: '/customers/delba-de-oliveira.png', amount: 12000 },
    ];

    const latestInvoices = data.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  try {
    // Hardcoded data for the top 4 cards (Will be replaced by LocalStorage later)
    const numberOfInvoices = 6;
    const numberOfCustomers = 3;
    const totalPaidInvoices = formatCurrency(150000);
    const totalPendingInvoices = formatCurrency(50000);

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  // We'll just return a dummy array for now
  return [];
}

export async function fetchInvoicesPages(query: string) {
  return 1;
}

export async function fetchInvoiceById(id?: string) {
  if (!id) {
    return null;
  }

  const data = [
    { id: '1', customer_id: '1', amount: 40000, status: 'paid' },
    { id: '2', customer_id: '2', amount: 2000, status: 'pending' },
    { id: '3', customer_id: '3', amount: 10000, status: 'paid' },
  ];

  const invoice = data.find((inv) => inv.id === id);

  return invoice || null;
}

export async function fetchCustomers() {
  try {
    const customers: CustomerField[] = [
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Smith" },
      { id: 3, name: "Bob Johnson" },
      { id: 4, name: "Alice Brown" }
    ];

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const customers = [
      { id: 1, name: "John Doe", email: "john@example.com", image_url: "/customers/amy-burns.png", total_invoices: 3, total_pending: 10000, total_paid: 25000 },
      { id: 2, name: "Jane Smith", email: "jane@example.com", image_url: "/customers/evil-rabbit.png", total_invoices: 2, total_pending: 5000, total_paid: 15000 },
    ];

    const formattedCustomers = customers.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(Number(customer.total_pending)),
      total_paid: formatCurrency(Number(customer.total_paid)),
    }));

    return formattedCustomers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}