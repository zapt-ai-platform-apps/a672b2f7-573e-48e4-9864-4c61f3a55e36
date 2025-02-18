import React from 'react';
import * as Sentry from '@sentry/browser';

/**
 * ErrorBoundary component catches JavaScript errors anywhere in its child component tree,
 * logs those errors, and displays a fallback UI.
 *
 * @class
 * @extends {React.Component}
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  /**
   * Updates state so the next render will show the fallback UI.
   *
   * @param {Error} error - The error that was thrown.
   * @returns {Object} A state object with hasError set to true.
   */
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  /**
   * Logs the error to Sentry.
   *
   * @param {Error} error - The error that was thrown.
   * @param {Object} errorInfo - An object with information about the error.
   */
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    Sentry.captureException(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <h1 className="text-3xl">Something went wrong.</h1>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;