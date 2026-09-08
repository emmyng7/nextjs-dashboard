'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export function CreateInvoice() {
  const [showForm, setShowForm] = useState(false);

  return (
    <button
      onClick={() => setShowForm(true)}
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500"
    >
      <span className="hidden md:block">Create Invoice</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </button>
  );
}