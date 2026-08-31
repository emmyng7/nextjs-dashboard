"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchInvoiceById } from '@/app/lib/services/invoiceService';
import { fetchCustomers } from '@/app/lib/services/customerService';

export default function Page() {
  const params = useParams();
  const invoiceId = Number(params.id);

  const [invoice, setInvoice] = useState<any>(null);
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [invoiceData, customerData] = await Promise.all([
          fetchInvoiceById(invoiceId),
          fetchCustomers()
        ]);
        setInvoice(invoiceData);
        
        // Only show active customers
        const activeCustomers = customerData.filter((c: any) => c.status === 'active');
        setCustomers(activeCustomers);
      } catch (error) {
        console.error("Failed to load invoice:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [invoiceId]);

  if (loading) {
    return <div className="text-center py-8 text-gray-500">Loading invoice...</div>;
  }

  if (!invoice) {
    return (
      <main>
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-900">Invoice Not Found</h2>
          <Link href="/dashboard/invoices" className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg">
            Go Back
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${invoiceId}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}