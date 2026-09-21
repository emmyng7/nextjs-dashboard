"use client";

import { useState, useEffect } from "react";
import { UsersIcon, UserPlusIcon, BanknotesIcon, ChartBarIcon } from "@heroicons/react/24/outline";
import { fetchCustomers } from "@/app/lib/services/customerService";
import { fetchInvoices } from "@/app/lib/services/invoiceService";
import { lusitana } from "@/app/ui/fonts";
import { formatCurrency } from "@/app/lib/utils";

export default function CustomerCount() {
  const [customerCount, setCustomerCount] = useState(0);
  const [invoiceCount, setInvoiceCount] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [totalPending, setTotalPending] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadCounts = async () => {
    try {
      const customers = await fetchCustomers();
      const invoices = await fetchInvoices();

      setCustomerCount(customers.length);
      setInvoiceCount(invoices.length);

      // CALCULATE COLLECTED (paid) AND PENDING AMOUNTS FROM REAL INVOICES
      let paid = 0;
      let pending = 0;
      invoices.forEach((inv: any) => {
        if (inv.status === 'paid') paid += Number(inv.amount) || 0;
        else if (inv.status === 'pending') pending += Number(inv.amount) || 0;
      });
      setTotalPaid(paid);
      setTotalPending(pending);
    } catch (error) {
      console.error("Failed to load counts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCounts();
    // Refresh when the page regains focus (after adding/editing invoices)
    window.addEventListener("focus", loadCounts);
    window.addEventListener("storage", loadCounts);
    return () => {
      window.removeEventListener("focus", loadCounts);
      window.removeEventListener("storage", loadCounts);
    };
  }, []);

  if (loading) {
    return (
      <>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-xl bg-gray-50 p-2 shadow-sm">
            <div className="flex p-4">
              <div className="h-5 w-5 bg-gray-200 rounded"></div>
              <h3 className="ml-2 text-sm font-medium text-gray-400">Loading...</h3>
            </div>
            <div className="flex items-center justify-center bg-white px-4 py-8">
              <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      {/* Collected */}
      <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
        <div className="flex p-4">
          <BanknotesIcon className="h-5 w-5 text-gray-700" />
          <h3 className="ml-2 text-sm font-medium">Collected</h3>
        </div>
        <p className={`${lusitana.className} truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}>
          {formatCurrency(totalPaid)}
        </p>
      </div>

      {/* Pending */}
      <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
        <div className="flex p-4">
          <ChartBarIcon className="h-5 w-5 text-gray-700" />
          <h3 className="ml-2 text-sm font-medium">Pending</h3>
        </div>
        <p className={`${lusitana.className} truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}>
          {formatCurrency(totalPending)}
        </p>
      </div>

      {/* Total Customers */}
      <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
        <div className="flex p-4">
          <UsersIcon className="h-5 w-5 text-gray-700" />
          <h3 className="ml-2 text-sm font-medium">Total Customers</h3>
        </div>
        <p className={`${lusitana.className} truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}>
          {customerCount}
        </p>
      </div>

      {/* Total Invoices */}
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