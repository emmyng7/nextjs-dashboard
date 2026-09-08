'use client';

import { useEffect, useState } from 'react';
import { createInvoice, State } from '@/app/lib/actions';
import { useActionState } from 'react';
import Link from 'next/link'; // <--- MISSING IMPORT ADDED
import { CheckIcon, ClockIcon, BanknotesIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { fetchCustomers } from '@/app/lib/services/customerService';

export default function Form({ customers }: { customers: any[] }) {
  const initialState: any = { message: null, errors: {} };
  const [state, formAction] = useActionState(createInvoice, initialState);

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
        </div>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">Choose an amount</label>
          <input name="amount" type="number" step="0.01" placeholder="Enter amount in Naira (₦)" className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2" />
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
        <Button type="submit">Create Invoice</Button>
      </div>
    </form>
  );
}