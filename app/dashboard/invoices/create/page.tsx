"use client";

import { useState, useEffect } from "react";
import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers, Customer } from '@/app/lib/services/customerService';

export default function Page() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const loadCustomers = async () => {
      const data = await fetchCustomers();
      const activeCustomers = data.filter((customer: any) => customer.status === 'active');
      setCustomers(activeCustomers);
    };
    loadCustomers();
  }, []);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Create Invoice',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers as any} />
    </main>
  );
}