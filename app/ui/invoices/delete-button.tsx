'use client';

import { useState } from 'react';
import { TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { deleteInvoice } from '@/app/lib/services/invoiceService';
import toast from 'react-hot-toast';

export default function DeleteButton({ id, onDeleted }: { id: string; onDeleted?: () => void }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteInvoice(Number(id)); // This actually deletes it
      toast.success('Invoice deleted successfully');
      setIsModalOpen(false);
      
      // IMPORTANT: Call the function passed from the table to re-render the list
      if (onDeleted) {
        onDeleted();
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete invoice');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="rounded-md border p-2 hover:bg-gray-100"
      >
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-8 max-w-lg w-full mx-4 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Delete Invoice</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-gray-100 rounded-md transition-colors">
                <XMarkIcon className="h-8 w-8 text-gray-500" />
              </button>
            </div>
            <p className="text-lg text-gray-600 mb-8 whitespace-normal break-words overflow-wrap-anywhere leading-relaxed">
              Are you sure you want to delete this invoice? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button onClick={() => setIsModalOpen(false)} className="px-6 py-3 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="px-6 py-3 text-lg font-medium bg-red-600 text-white hover:bg-red-700 rounded-md transition-colors disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete Invoice'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}