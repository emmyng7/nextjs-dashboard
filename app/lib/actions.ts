import { 
  fetchCustomers, 
  createCustomer, 
  updateCustomer, 
  deleteCustomer, 
  Customer 
} from '@/app/lib/services/customerService';
import { 
  deleteInvoice as deleteInvoiceFromLocal, 
  createInvoice as createInvoiceLocal, 
  updateInvoice as updateInvoiceLocal 
} from '@/app/lib/services/invoiceService';

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
    name?: string[];
    email?: string[];
    phone?: string[];
    company?: string[];
    address?: string[];
  };
  message?: string | null;
};

// --- AUTHENTICATION ---
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const users = await fetch('YOUR_DATABASE_ENDPOINT_HERE'); // Replace with your auth logic if needed!
    return 'Success';
  } catch (error) {
    console.error(error);
    return 'Something went wrong.';
  }
}

// --- INVOICES ---

// Delete Invoice from LocalStorage
export async function deleteInvoice(id: string) {
  try {
    await deleteInvoiceFromLocal(Number(id));
  } catch (error) {
    console.error(error);
    throw new Error('Failed to Delete Invoice');
  }
}

// Create Invoice from LocalStorage
export async function createInvoice(prevState: State, formData: FormData) {
  const customerId = Number(formData.get('customerId'));
  const amount = Number(formData.get('amount'));
  const status = formData.get('status') as 'paid' | 'pending';

  if (!customerId) {
    return {
      errors: { customerId: ['Please select a customer.'] },
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  if (!amount || amount <= 0) {
    return {
      errors: { amount: ['Please enter an amount greater than 0.'] },
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  try {
    // 1. Look up the customer by ID to get their name, email, and image
    const customers = await fetchCustomers();
    const customer = customers.find((c: Customer) => c.id === customerId);

    // 2. Create the invoice WITH the customer's details
    await createInvoiceLocal({
      customerId,
      name: customer?.name || 'Unknown Customer',
      email: customer?.email || 'no-email@example.com',
      image_url: customer?.photo || '',
      amount,
      status,
    });

    return { message: 'Invoice created successfully.' };
  } catch (error) {
    console.error(error);
    return { message: 'Database Error: Failed to Create Invoice.' };
  }
}

// Update Invoice from LocalStorage
export async function updateInvoice(id: string, prevState: State, formData: FormData) {
  const customerId = Number(formData.get('customerId'));
  const amount = Number(formData.get('amount'));
  const status = formData.get('status') as 'paid' | 'pending';

  if (!customerId) {
    return {
      errors: { customerId: ['Please select a customer.'] },
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  if (!amount || amount <= 0) {
    return {
      errors: { amount: ['Please enter an amount greater than 0.'] },
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  try {
    // 1. Look up the customer by ID to get their name, email, and image
    const customers = await fetchCustomers();
    const customer = customers.find((c: Customer) => c.id === customerId);

    // 2. Update the invoice WITH the customer's details
    await updateInvoiceLocal(Number(id), {
      customerId,
      name: customer?.name || 'Unknown Customer',
      email: customer?.email || 'no-email@example.com',
      image_url: customer?.photo || '',
      amount,
      status,
    });

    return { message: 'Invoice updated successfully.' };
  } catch (error) {
    console.error(error);
    return { message: 'Database Error: Failed to Update Invoice.' };
  }
}

// --- CUSTOMERS ---

// Create Customer
export async function createCustomerAction(prevState: State, formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const company = formData.get('company') as string;
  const address = formData.get('address') as string;
  const status = formData.get('status') as 'active' | 'inactive';

  if (!name || !email) {
    return {
      errors: { name: ['Name is required.'], email: ['Email is required.'] },
      message: 'Missing Fields. Failed to Create Customer.',
    };
  }

  try {
    await createCustomer({
      name,
      email,
      phone,
      company,
      address,
      status,
    } as any);
    return { message: 'Customer created successfully.' };
  } catch (error) {
    console.error(error);
    return { message: 'Database Error: Failed to Create Customer.' };
  }
}

// Update Customer
export async function updateCustomerAction(id: number, prevState: State, formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const company = formData.get('company') as string;
  const address = formData.get('address') as string;
  const status = formData.get('status') as 'active' | 'inactive';

  if (!name || !email) {
    return {
      errors: { name: ['Name is required.'], email: ['Email is required.'] },
      message: 'Missing Fields. Failed to Update Customer.',
    };
  }

  try {
    await updateCustomer(id, {
      name,
      email,
      phone,
      company,
      address,
      status,
    } as any);
    return { message: 'Customer updated successfully.' };
  } catch (error) {
    console.error(error);
    return { message: 'Database Error: Failed to Update Customer.' };
  }
}

// Delete Customer
export async function deleteCustomerAction(id: number) {
  try {
    await deleteCustomer(id);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to Delete Customer');
  }
}