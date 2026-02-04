import { useEffect, useMemo, useState } from "react";
import styles from "./Toast.module.css";

export type ToastType = "success" | "error" | "warning" | "info";

export type ToastProps = {
  open: boolean;
  message: string;
  type?: ToastType;
  duration?: number; // ms
  closable?: boolean;
  onClose: () => void;
};

export function Toast({
  open,
  message,
  type = "info",
  duration = 2500,
  closable = true,
  onClose,
}: ToastProps) {
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    if (open) setVisible(true);
  }, [open]);

  const colorVar = useMemo(() => {
    if (type === "success") return "var(--success)";
    if (type === "error") return "var(--danger)";
    if (type === "warning") return "var(--warn)";
    return "var(--info)";
  }, [type]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => handleClose(), duration);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, duration]);

  const handleClose = () => {
    setVisible(false);
    window.setTimeout(() => onClose(), 180);
  };

  if (!open && visible === false) return null;

  return (
    <div className={styles.viewport} aria-live="polite" aria-atomic="true">
      <div
        className={styles.toast}
        data-open={visible ? "true" : "false"}
        style={{ borderColor: colorVar }}
        role="status"
      >
        <div className={styles.dot} style={{ background: colorVar }} />
        <div className={styles.message}>{message}</div>

        {closable ? (
          <button className={styles.close} onClick={handleClose} aria-label="Close">
            ✕
          </button>
        ) : null}
      </div>
    </div>
  );
}
