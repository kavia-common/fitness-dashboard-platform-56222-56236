import React, { useEffect } from "react";
import "./Modal.css";

export default function Modal({ open, title, children, onClose }) {
  useEffect(() => {
    if (!open) return;

    function onKeyDown(e) {
      if (e.key === "Escape") onClose?.();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modalOverlay" role="dialog" aria-modal="true" aria-label={title}>
      <div className="modalBackdrop" onClick={() => onClose?.()} />
      <div className="modalPanel">
        <div className="modalHeader">
          <div>
            <div className="modalTitle">{title}</div>
            <div className="modalSubtitle muted">Set your baseline so plans and insights fit you.</div>
          </div>
          <button className="btn btnGhost" onClick={() => onClose?.()} aria-label="Close modal">
            ✕
          </button>
        </div>
        <div className="modalBody">{children}</div>
      </div>
    </div>
  );
}
