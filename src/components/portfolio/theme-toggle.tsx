"use client";

import { useTheme, type Theme } from "./theme-provider";
import styles from "./theme-toggle.module.css";

const options: { value: Theme; label: string; ariaLabel: string }[] = [
  { value: "system", label: "Auto", ariaLabel: "Use system theme" },
  { value: "light", label: "Light", ariaLabel: "Use light theme" },
  { value: "dark", label: "Dark", ariaLabel: "Use dark theme" },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className={styles.toggle} role="radiogroup" aria-label="Theme selection">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={theme === option.value}
          aria-label={option.ariaLabel}
          className={`${styles.option} ${theme === option.value ? styles.active : ""}`}
          onClick={() => setTheme(option.value)}
        >
          <span className={styles.label}>{option.label}</span>
        </button>
      ))}
      <div
        className={styles.indicator}
        style={{
          transform: `translateX(${options.findIndex((o) => o.value === theme) * 100}%)`,
        }}
        aria-hidden="true"
      />
    </div>
  );
}
