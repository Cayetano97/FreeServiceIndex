import { Zap } from "lucide-react";

export default function Header() {
  return (
    <header className="app-header">
      <div className="container header-content">
        <div className="logo-mark">
          <Zap className="logo-icon" />
        </div>
        <h1 className="logo-title">
          FreeServiceIndex
        </h1>
      </div>
    </header>
  );
}
