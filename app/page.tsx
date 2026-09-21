import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* NAVIGATION */}
      <nav className="flex items-center justify-between px-6 py-6 md:px-12">
        <div className="text-2xl font-bold tracking-tight">
          <span className="text-blue-500">◆</span> INVOICE
        </div>
        <div className="hidden items-center gap-8 text-sm md:flex">
          <Link href="/" className="text-gray-400 hover:text-white transition">
            Home <span className="text-xs text-gray-600 ml-1">01</span>
          </Link>
          <Link href="/dashboard" className="text-gray-400 hover:text-white transition">
            Dashboard <span className="text-xs text-gray-600 ml-1">02</span>
          </Link>
          <Link href="/dashboard/customers" className="text-gray-400 hover:text-white transition">
            Customers <span className="text-xs text-gray-600 ml-1">03</span>
          </Link>
          <Link href="/login" className="text-gray-400 hover:text-white transition">
            Contact <span className="text-xs text-gray-600 ml-1">04</span>
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative flex min-h-[85vh] flex-col items-center justify-center px-6 text-center">

        {/* CEO Card */}
        <div className="absolute right-6 top-6 hidden rounded-xl bg-white p-3 text-left shadow-2xl md:block">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600"></div>
            <div>
              <p className="text-xs font-semibold text-gray-900">Meet the CEO</p>
              <p className="text-xs text-gray-500">GERALD NG</p>
              <p className="text-[10px] uppercase text-gray-400">Founder</p>
            </div>
          </div>
        </div>

        {/* Small text top left */}
        <p className="mx-auto mb-10 max-w-md text-sm text-gray-400 md:max-w-lg">
          Create invoices, manage customers, and track your revenue — all in one place.
          Built for Nigerian small business owners.
        </p>

        {/* Explore Link */}
        <Link
          href="/login"
          className="mb-20 inline-flex items-center gap-2 border-b border-white pb-1 text-sm text-white transition hover:gap-4"
        >
          Explore Now →
        </Link>

        {/* BIG BRAND TEXT */}
        <h1 className="select-none text-[18vw] font-black leading-none tracking-tighter">
          INVOICE<span className="text-blue-500">X</span>
        </h1>

        {/* Bottom row */}
        <div className="absolute bottom-6 left-6 flex items-center gap-4 text-xs text-gray-500 md:left-12">
          <span>© 2026</span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-px bg-gray-600"></span>
            <span className="h-3 w-px bg-gray-600"></span>
            <span className="h-4 w-px bg-gray-600"></span>
            <span className="h-2 w-px bg-gray-600"></span>
            <span className="h-1 w-px bg-gray-600"></span>
          </span>
          <span>20°</span>
        </div>

        <div className="absolute bottom-6 right-6 flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium text-black md:right-12">
          Made with Next.js
        </div>

      </section>

      {/* BOTTOM THUMBNAILS */}
      <section className="grid grid-cols-3 gap-3 px-6 pb-12 md:px-12">
        <div className="aspect-video rounded-xl bg-gradient-to-br from-blue-600 to-blue-900"></div>
        <div className="aspect-video rounded-xl bg-gradient-to-br from-gray-800 to-gray-900"></div>
        <div className="aspect-video rounded-xl bg-gradient-to-br from-blue-400 to-blue-800"></div>
      </section>

    </main>
  );
}