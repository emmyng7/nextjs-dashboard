import Search from '@/app/ui/search';
import Table from '@/app/ui/invoices/table';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Invoices',
};

export default async function Page() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      
      {/* CRITICAL FIX: Wrap Search in Suspense to avoid useSearchParams error */}
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Suspense fallback={<div className="h-10 w-full animate-pulse rounded-md bg-gray-100" />}>
          <Search placeholder="Search invoices..." />
        </Suspense>
        <CreateInvoice />
      </div>
      
      <Suspense fallback={<InvoicesTableSkeleton />}>
        <Table />
      </Suspense>
    </div>
  );
}