'use client';

import { PlusIcon, PencilIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';

export function CreateInvoice() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowForm(true)}
        className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500"
      >
        <span className="hidden md:block">Create Invoice</span>{' '}
        <PlusIcon className="h-5 md:ml-4" />
      </button>
      {showForm && <InvoiceModal onClose={() => setShowForm(false)} />}
    </>
  );
}

export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/invoices/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

// A simple modal for creating invoice (won't crash)
function InvoiceModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        <h2 className="text-xl font-bold mb-4">Create Invoice</h2>
        <p className="mb-4 text-gray-600">This is a placeholder. Add your form here.</p>
        <button onClick={onClose} className="px-4 py-2 bg-blue-600 text-white rounded">Close</button>
      </div>
    </div>
  );
}