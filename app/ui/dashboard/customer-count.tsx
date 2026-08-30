"use client";

import { useState, useEffect } from "react";
import { UsersIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { fetchCustomers } from "@/app/lib/services/customerService";
import { fetchInvoices } from "@/app/lib/services/invoiceService";
import { lusitana } from "@/app/ui/fonts";

export default function CustomerCount() {
  const [customerCount, setCustomerCount] = useState(0);
  const [invoiceCount, setInvoiceCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadCounts = async () => {
    try {
      const customers = await fetchCustomers();
      const invoices = await fetchInvoices();
      setCustomerCount(customers.length);
      setInvoiceCount(invoices.length);
    } catch (error) {
      console.error("Failed to load counts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCounts();

    // Listen for changes in localStorage so the counts update instantly
    const handleStorage = () => {
      loadCounts();
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("focus", handleStorage); // Also refresh when tab regains focus

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("focus", handleStorage);
    };
  }, []);

  if (loading) {
    return (
      <>
        <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
          <div className="flex p-4">
            <UsersIcon className="h-5 w-5 text-gray-700" />
            <h3 className="ml-2 text-sm font-medium">Total Customers</h3>
          </div>
          <div className="flex items-center justify-center bg-white px-4 py-8">
            <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
          <div className="flex p-4">
            <UserPlusIcon className="h-5 w-5 text-gray-700" />
            <h3 className="ml-2 text-sm font-medium">Total Invoices</h3>
          </div>
          <div className="flex items-center justify-center bg-white px-4 py-8">
            <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
        <div className="flex p-4">
          <UsersIcon className="h-5 w-5 text-gray-700" />
          <h3 className="ml-2 text-sm font-medium">Total Customers</h3>
        </div>
        <p className={`${lusitana.className} truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}>
          {customerCount}
        </p>
      </div>
      <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
        <div className="flex p-4">
          <UserPlusIcon className="h-5 w-5 text-gray-700" />
          <h3 className="ml-2 text-sm font-medium">Total Invoices</h3>
        </div>
        <p className={`${lusitana.className} truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}>
          {invoiceCount}
        </p>
      </div>
    </>
  );
}