import { Revenue } from './definitions';

export const formatCurrency = (amount: number) => {
  // Removed / 100 so it shows the exact amount in Naira
  return (amount).toLocaleString('en-NG', {
    style: 'currency',
    currency: 'NGN',
  });
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-US', // Changed back to en-US for standard date display (e.g., "Jan 1, 2025")
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const generateYAxis = (revenue: Revenue[]) => {
  const yAxisLabels = [];
  const highestRecord = Math.max(...revenue.map((month) => month.revenue));

  // If highest record is 0, use 1000 as base to avoid dividing by zero
  const topLabel = highestRecord > 0 ? highestRecord : 1000;

  // Create 6 evenly spaced labels
  for (let i = 5; i >= 0; i--) {
    const value = (topLabel / 5) * i;
    yAxisLabels.push(`₦${(value / 1000).toFixed(0)}K`);
  }

  return { yAxisLabels, topLabel };
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};