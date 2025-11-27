import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { useMemo, useState } from "react";
import Header from "./components/Header";
import Guides from "./components/Guides";
import CategoryScroll from "./components/CategoryScroll";
import PlatformScroll from "./components/PlatformScroll";
import ServiceGrid from "./components/ServiceGrid";
import { Analytics } from "@vercel/analytics/react";
import servicesData from "./db/services.json";

const Navigation = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <nav className="flex space-x-6">
      <Link
        to="/"
        className={`
          py-4 text-sm font-medium transition-colors border-b-2
          ${
            isHome
              ? "border-foreground text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }
        `}
      >
        Servicios
      </Link>
      <Link
        to="/guides"
        className={`
          py-4 text-sm font-medium transition-colors border-b-2
          ${
            !isHome
              ? "border-foreground text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }
        `}
      >
        Guías
      </Link>
    </nav>
  );
};

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedPlatform, setSelectedPlatform] = useState("Universal");

  const platforms = useMemo(() => {
    const set = new Set<string>();
    servicesData.services.forEach((s) => {
      if (s.platform) set.add(s.platform);
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, []);

  const categories = useMemo(() => {
    return servicesData.categories;
  }, []);

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <CategoryScroll
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <PlatformScroll
          platforms={platforms}
          selectedPlatform={selectedPlatform}
          onSelectPlatform={setSelectedPlatform}
        />
      </div>
      <ServiceGrid
        services={servicesData.services}
        selectedCategory={selectedCategory}
        selectedPlatform={selectedPlatform}
      />
    </div>
  );
};

const App = () => (
  <Router>
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Navigation />
        </div>
      </div>
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/guides" element={<Guides />} />
        </Routes>
      </main>
      <Analytics />
    </div>
  </Router>
);

export default App;
