'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';
import { createInvoice, State } from '@/app/lib/actions';
import Link from 'next/link';
import { CheckIcon, ClockIcon, BanknotesIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import toast from 'react-hot-toast';

export default function Form({ customers }: { customers: any[] }) {
  const router = useRouter();
  const initialState: any = { message: null, errors: {} };
  const [state, formAction, isPending] = useActionState(createInvoice, initialState);

  // THIS IS THE ALERT + REDIRECT LOGIC
  useEffect(() => {
    if (state?.success) {
      toast.success('Invoice created successfully!');
      // Wait 1.5 seconds, then go back to the invoices page
      setTimeout(() => {
        router.push('/dashboard/invoices');
        router.refresh();
      }, 1500);
    }
  }, [state, router]);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">Choose customer</label>
          <select name="customerId" className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2" defaultValue="">
            <option value="" disabled>Select a customer</option>
            {customers.map((customer: any) => (
              <option key={customer.id} value={customer.id}>{customer.name}</option>
            ))}
          </select>
          {state?.errors?.customerId && (
            <p className="mt-2 text-sm text-red-500">{state.errors.customerId[0]}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">Choose an amount</label>
          <input name="amount" type="number" step="0.01" placeholder="Enter amount in Naira (₦)" className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2" />
          {state?.errors?.amount && (
            <p className="mt-2 text-sm text-red-500">{state.errors.amount[0]}</p>
          )}
        </div>
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">Set the invoice status</legend>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input name="status" type="radio" value="pending" className="mr-2" /> Pending
            </label>
            <label className="flex items-center">
              <input name="status" type="radio" value="paid" className="mr-2" /> Paid
            </label>
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link href="/dashboard/invoices" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">Cancel</Link>
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Creating...' : 'Create Invoice'}
        </Button>
      </div>
    </form>
  );
}