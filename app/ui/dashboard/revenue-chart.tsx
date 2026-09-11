"use client";

import { generateYAxis } from '@/app/lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { useState, useEffect } from 'react';
import { fetchInvoices } from '@/app/lib/services/invoiceService';

export default function RevenueChart() {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const loadRevenue = async () => {
      const invoices = await fetchInvoices();

      // Build monthly revenue for the current year
      const monthlyRevenue: { [key: string]: number } = {};
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      months.forEach(m => monthlyRevenue[m] = 0);

      invoices.forEach(inv => {
        const date = new Date(inv.date);
        const month = months[date.getMonth()];
        if (month) {
          monthlyRevenue[month] += inv.amount;
        }
      });

      const revenueArray = months.map(month => ({ month, revenue: monthlyRevenue[month] }));
      setChartData(revenueArray);
    };
    loadRevenue();
  }, []);

  if (!chartData) {
    return (
      <div className="w-full md:col-span-4">
        <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>Recent Revenue</h2>
        <div className="rounded-xl bg-gray-50 p-4">
          <div className="h-[400px] bg-white rounded-md flex items-center justify-center text-gray-400 animate-pulse">
            Loading Chart...
          </div>
        </div>
      </div>
    );
  }

  const chartHeight = 350;
  const { yAxisLabels, topLabel } = generateYAxis(chartData);

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Recent Revenue
      </h2>
      <div className="rounded-xl bg-gray-50 p-4">
        <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
          <div
            className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {chartData.map((month: any) => (
            <div key={month.month} className="flex flex-col items-center gap-2">
              <div
                className="w-full rounded-md bg-blue-300"
                style={{
                  height: `${(chartHeight / topLabel) * month.revenue}px`,
                }}
              ></div>
              <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                {month.month}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Last 12 months</h3>
        </div>
      </div>
    </div>
  );
}