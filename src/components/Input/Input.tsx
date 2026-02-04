import React, { forwardRef, useId, useMemo, useState } from "react";
import styles from "./Input.module.css";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "onChange" | "value" | "defaultValue"
> & {
  label?: string;
  hint?: string;
  error?: string;
  clearable?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    hint,
    error,
    clearable = false,
    type = "text",
    value,
    defaultValue,
    onChange,
    disabled,
    placeholder,
    id,
    ...rest
  },
  ref
) {
  const autoId = useId();
  const inputId = id ?? autoId;

  const isControlled = value !== undefined;
  const [inner, setInner] = useState(defaultValue ?? "");
  const currentValue = isControlled ? value : inner;

  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const effectiveType = isPassword ? (showPassword ? "text" : "password") : type;

  const showClear = clearable && !disabled && (currentValue?.length ?? 0) > 0;

  const describedBy = useMemo(() => {
    const ids: string[] = [];
    if (hint) ids.push(`${inputId}-hint`);
    if (error) ids.push(`${inputId}-error`);
    return ids.length ? ids.join(" ") : undefined;
  }, [hint, error, inputId]);

  const setValue = (next: string) => {
    if (!isControlled) setInner(next);
    onChange?.(next);
  };

  return (
    <div
      className={styles.root}
      data-disabled={disabled ? "true" : "false"}
      data-error={error ? "true" : "false"}
    >
      {label ? (
        <label className={styles.label} htmlFor={inputId}>
          {label}
        </label>
      ) : null}

      <div className={styles.field}>
        <input
          {...rest}
          ref={ref}
          id={inputId}
          className={styles.input}
          type={effectiveType}
          value={currentValue}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          onChange={(e) => setValue(e.target.value)}
        />

        <div className={styles.actions}>
          {isPassword ? (
            <button
              type="button"
              className={styles.iconBtn}
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              disabled={disabled}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          ) : null}

          {showClear ? (
            <button
              type="button"
              className={styles.iconBtn}
              onClick={() => setValue("")}
              aria-label="Clear"
              disabled={disabled}
            >
              ✕
            </button>
          ) : null}
        </div>
      </div>

      {error ? (
        <div id={`${inputId}-error`} className={styles.error}>
          {error}
        </div>
      ) : hint ? (
        <div id={`${inputId}-hint`} className={styles.hint}>
          {hint}
        </div>
      ) : null}
    </div>
  );
});
