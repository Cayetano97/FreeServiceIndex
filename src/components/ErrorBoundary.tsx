import { Component, type ReactNode, type ErrorInfo } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="app-shell">
          <main className="container main" style={{ textAlign: "center", paddingTop: "4rem" }}>
            <h2>Algo salió mal</h2>
            <p style={{ color: "var(--muted-foreground)" }}>
              Recarga la página e inténtalo de nuevo.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="chip is-active"
              style={{ marginTop: "1rem" }}
            >
              Recargar
            </button>
          </main>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
