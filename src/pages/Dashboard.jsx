import { useState } from 'react';

// Mock receipt data
const mockReceipts = [
  {
    id: 1,
    fileUrl: 'https://via.placeholder.com/150',
    final_amount: 29.99,
    created_at: '2025-09-06'
  },
  {
    id: 2,
    fileUrl: null, // Simulate PDF
    final_amount: 45.50,
    created_at: '2025-09-05'
  }
];

function Dashboard() {
  const [receipts] = useState(mockReceipts);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">Your Receipts</h2>
      {receipts.length === 0 ? (
        <p>No receipts found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {receipts.map(receipt => (
            <div key={receipt.id} className="border p-4 rounded shadow">
              {receipt.fileUrl ? (
                <img
                  src={receipt.fileUrl}
                  alt="Receipt"
                  className="w-full h-48 object-cover mb-2"
                />
              ) : (
                <iframe
                  src="https://via.placeholder.com/150" // Placeholder for PDF
                  title="Receipt"
                  className="w-full h-48 mb-2"
                />
              )}
              <p className="text-sm">Amount: ${receipt.final_amount?.toFixed(2) || 'N/A'}</p>
              <p className="text-sm">
                Date: {receipt.created_at ? new Date(receipt.created_at).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;