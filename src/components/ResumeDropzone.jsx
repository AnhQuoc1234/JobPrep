import { FileText, X } from "lucide-react";

// File dropzone for resume upload. The "drop" is mocked — replace
// the click handler with real file input handling in production.

export default function ResumeDropzone({ resume, setResume }) {
  const handleClick = () => {
    // TODO: replace with real <input type="file"> handling
    setResume({ name: "alex_chen_resume.pdf", size: "247 KB" });
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border-strong)")}
      style={{
        border: "1px dashed var(--border-strong)",
        borderRadius: 6,
        padding: 24,
        textAlign: "center",
        background: "var(--bg-base)",
        cursor: "pointer",
        transition: "border-color 0.2s",
      }}
    >
      {resume ? (
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, textAlign: "left" }}>
            <FileText size={20} style={{ color: "var(--accent)" }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{resume.name}</div>
              <div style={{
                fontSize: 11, color: "var(--fg-muted)",
                fontFamily: "var(--font-mono)",
              }}>
                {resume.size}
              </div>
            </div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); setResume(null); }}
            style={{
              background: "none", border: "none",
              color: "var(--fg-muted)", cursor: "pointer", padding: 4,
            }}
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <>
          <FileText size={28} style={{ color: "var(--fg-muted)", margin: "0 auto 8px" }} />
          <div style={{ fontSize: 13, color: "var(--fg-secondary)" }}>
            Drop PDF or click to upload
          </div>
          <div style={{
            fontSize: 11, color: "var(--fg-muted)", marginTop: 4,
            fontFamily: "var(--font-mono)",
          }}>
            max 5MB · pdf, docx
          </div>
        </>
      )}
    </div>
  );
}
