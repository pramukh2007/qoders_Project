import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UploadReceipt() {
  const [file, setFile] = useState(null);
  const [finalAmount, setFinalAmount] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }
    if (!finalAmount) {
      setError('Please enter an amount');
      return;
    }
    // Simulate upload
    console.log('Simulated upload:', { file, finalAmount, createdAt });
    navigate('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Upload Receipt</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="receipt" className="block text-sm font-medium">
            Select Receipt (JPEG, PNG, PDF)
          </label>
          <input
            id="receipt"
            type="file"
            accept="image/jpeg,image/png,application/pdf"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
          />
        </div>
        {previewUrl && (
          <div>
            <p className="text-sm font-medium">Preview:</p>
            {file?.type === 'application/pdf' ? (
              <iframe
                src={previewUrl}
                title="Receipt Preview"
                className="w-full h-48 mb-2"
              />
            ) : (
              <img
                src={previewUrl}
                alt="Receipt Preview"
                className="w-full h-48 object-cover mb-2"
              />
            )}
          </div>
        )}
        <div>
          <label htmlFor="finalAmount" className="block text-sm font-medium">
            Amount ($)
          </label>
          <input
            id="finalAmount"
            type="number"
            step="0.01"
            value={finalAmount}
            onChange={(e) => setFinalAmount(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="createdAt" className="block text-sm font-medium">
            Date (optional)
          </label>
          <input
            id="createdAt"
            type="date"
            value={createdAt}
            onChange={(e) => setCreatedAt(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Upload
        </button>
      </form>
    </div>
  );
}

export default UploadReceipt;