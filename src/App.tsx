import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { useMemo, useState } from "react";
import Header from "./components/Header";
// import Guides from "./components/Guides";
import CategoryScroll from "./components/CategoryScroll";
import PlatformScroll from "./components/PlatformScroll";
import ServiceGrid from "./components/ServiceGrid";
import servicesData from "./db/services.json";

const Navigation = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <nav className="nav">
      {/*
      <Link
        to="/"
        className={`nav__link ${isHome ? "is-active" : ""}`}
      >
        Servicios
      </Link>
      {/*
      <Link
        to="/guides"
        className={`nav__link ${!isHome ? "is-active" : ""}`}
      >
        Guías
      </Link>
      */}
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
    <div className="stack stack--lg">
      <div className="stack stack--md">
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
    <div className="app-shell">
      <Header />
      <div className="nav-shell">
        <div className="container">
          <Navigation />
        </div>
      </div>
      <main className="container main">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/guides" element={<Guides />} /> */}
        </Routes>
      </main>
    </div>
  </Router>
);

export default App;
