import { Zap } from "lucide-react";

export default function Header() {
  return (
    <header className="app-header">
      <div className="container header-content">
        <div className="logo-mark">
          <Zap className="logo-icon" aria-hidden="true" />
        </div>
        <div>
          <h1 className="logo-title">FreeServiceIndex</h1>
          <p className="logo-subtitle">
            <a
              href="https://fmhy.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="header-fmhy-link"
            >
              Más en FMHY
            </a>
          </p>
        </div>
      </div>
    </header>
  );
}
