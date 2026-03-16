"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error boundary component that catches errors in child components.
 * Provides graceful degradation with customizable fallback UI.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console in development
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          role="alert"
          style={{
            padding: "2rem",
            textAlign: "center",
            color: "var(--text-secondary)",
          }}
        >
          <h2 style={{ color: "var(--text-primary)", marginBottom: "1rem" }}>
            Something went wrong
          </h2>
          <p style={{ marginBottom: "1rem" }}>
            We encountered an error while loading this section.
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              padding: "0.75rem 1.5rem",
              borderRadius: "999px",
              background: "var(--text-primary)",
              color: "var(--text-inverse)",
              cursor: "pointer",
              border: "none",
            }}
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
