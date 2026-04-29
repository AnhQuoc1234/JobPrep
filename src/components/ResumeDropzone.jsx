import { useRef, useState } from "react";
import { FileText, Upload, X } from "lucide-react";

const MAX_BYTES = 5 * 1024 * 1024;

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function ResumeDropzone({ resume, setResume }) {
  const inputRef              = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError]       = useState(null);

  const handleFile = (file) => {
    if (!file) return;
    if (file.type !== "application/pdf") {
      setError("PDF files only.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setError("File exceeds 5 MB limit.");
      return;
    }
    setError(null);
    setResume({ name: file.name, size: formatSize(file.size), file });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleDragOver  = (e) => { e.preventDefault(); setDragging(true); };
  const handleDragLeave = ()    => setDragging(false);

  const handleInputChange = (e) => {
    handleFile(e.target.files[0]);
    e.target.value = "";
  };

  const borderColor = error ? "var(--danger)" : dragging ? "var(--accent)" : "var(--border-strong)";

  return (
    <div>
      <div
        onClick={() => !resume && inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDragEnter={(e) => { e.preventDefault(); setDragging(true); }}
        style={{
          border: `1px dashed ${borderColor}`,
          borderRadius: 6, padding: 28,
          textAlign: "center",
          background: dragging ? "var(--accent-dim)" : "var(--bg-base)",
          cursor: resume ? "default" : "pointer",
          transition: "border-color 0.2s, background 0.2s",
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleInputChange}
          style={{ display: "none" }}
        />

        {resume ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, textAlign: "left" }}>
              <FileText size={20} style={{ color: "var(--accent)" }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{resume.name}</div>
                <div style={{ fontSize: 11, color: "var(--fg-muted)", fontFamily: "var(--font-mono)" }}>
                  {resume.size}
                </div>
              </div>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); setResume(null); setError(null); }}
              style={{ background: "none", border: "none", color: "var(--fg-muted)", cursor: "pointer", padding: 4 }}
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <>
            <Upload size={28} style={{ color: dragging ? "var(--accent)" : "var(--fg-muted)", margin: "0 auto 10px" }} />
            <div style={{ fontSize: 13, color: dragging ? "var(--accent)" : "var(--fg-secondary)" }}>
              {dragging ? "Drop it here" : "Drop PDF here or click to browse"}
            </div>
            <div style={{ fontSize: 11, color: "var(--fg-muted)", marginTop: 4, fontFamily: "var(--font-mono)" }}>
              PDF only · max 5 MB
            </div>
          </>
        )}
      </div>

      {error && (
        <div style={{ fontSize: 12, color: "var(--danger)", marginTop: 6, fontFamily: "var(--font-mono)" }}>
          {error}
        </div>
      )}
    </div>
  );
}
