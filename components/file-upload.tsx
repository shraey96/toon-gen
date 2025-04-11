"use client";

interface FileUploadProps {
  error: string | null;
  handleFile: (file: File) => void;
  handleCancel: () => void;
  disabled?: boolean;
}

export default function FileUpload({
  error,
  handleFile,
  handleCancel,
  disabled = false,
}: FileUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  return (
    <div className="border border-white/20 rounded-lg p-8 hover:bg-white/5 transition-all duration-200">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="file-upload"
        disabled={disabled}
      />
      <label
        htmlFor="file-upload"
        className={`cursor-pointer block space-y-4 ${
          disabled ? "cursor-not-allowed" : ""
        }`}
      >
        <div className="space-y-4">
          <div className={`animate-pulse ${disabled ? "opacity-50" : ""}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8 text-purple-400 mx-auto"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <p className="text-white/70 text-center">
            Upload from device
            <br />
            <span className="text-sm">Supported: JPG, PNG, WEBP (Max 5MB)</span>
          </p>
        </div>
      </label>
      {error && (
        <p className="text-red-400 text-sm text-center mt-4 mb-2">{error}</p>
      )}
    </div>
  );
}
