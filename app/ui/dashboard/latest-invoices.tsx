"use client";

import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { lusitana } from '@/app/ui/fonts';
import { formatCurrency, formatDateToLocal } from '@/app/lib/utils';
import { useState, useEffect } from 'react';
import { fetchInvoices, Invoice } from '@/app/lib/services/invoiceService';

export default function LatestInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInvoices = async () => {
      const data = await fetchInvoices();
      // Sort by date descending and take the latest 5
      const sorted = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setInvoices(sorted.slice(0, 5));
      setLoading(false);
    };
    loadInvoices();
  }, []);

  if (loading) {
    return (
      <div className="flex w-full flex-col md:col-span-4">
        <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>Latest Invoices</h2>
        <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
          <div className="bg-white px-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex flex-row items-center justify-between border-t py-4 animate-pulse">
                <div className="flex items-center">
                  <div className="mr-4 h-8 w-8 rounded-full bg-gray-200"></div>
                  <div className="min-w-0">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Latest Invoices
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {invoices.map((invoice, i) => {
            return (
              <div
                key={invoice.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  { 'border-t': i !== 0 },
                )}
              >
                <div className="flex items-center">
                  <div className="mr-4 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold">
                    {invoice.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {invoice.name}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {invoice.email}
                    </p>
                  </div>
                </div>
                <p className={`${lusitana.className} truncate text-sm font-medium md:text-base`}>
                  {formatCurrency(invoice.amount)}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}