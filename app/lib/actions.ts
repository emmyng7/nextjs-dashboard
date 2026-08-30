import { createCustomer, updateCustomer, deleteCustomer } from '@/app/lib/services/customerService';
import { deleteInvoice as deleteInvoiceFromLocal } from '@/app/lib/services/invoiceService';

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

// --- AUTHENTICATION (NO postgres - uses LocalStorage for now) ---
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // For a demo: You can manually check if the login is correct.
  // If you want to use your database, put this logic in a separate Server Component.
  // For now, we will allow any email and password to log in.
  return 'Success';
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
    const { createInvoice: createInvoiceLocal } = await import('@/app/lib/services/invoiceService');
    await createInvoiceLocal({ customerId, amount, status });
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
    const { updateInvoice: updateInvoiceLocal } = await import('@/app/lib/services/invoiceService');
    await updateInvoiceLocal(Number(id), { customerId, amount, status });
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