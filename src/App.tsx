import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useMemo, memo } from "react";
import Header from "./components/Header";
import CategoryScroll from "./components/CategoryScroll";
import PlatformScroll from "./components/PlatformScroll";
import ServiceGrid from "./components/ServiceGrid";
import servicesData from "./db/services.json";
import { useUrlParam } from "@/lib/utils";

const Home = memo(() => {
  const [selectedCategory, setSelectedCategory] = useUrlParam(
    "category",
    "Todos",
  );
  const [selectedPlatform, setSelectedPlatform] = useUrlParam(
    "platform",
    "Universal",
  );

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

  const filteredServices = useMemo(() => {
    const byCategory =
      selectedCategory === "Todos"
        ? servicesData.services
        : servicesData.services.filter(
            (service) => service.category === selectedCategory,
          );
    const byPlatform =
      selectedPlatform === "Universal"
        ? byCategory
        : byCategory.filter((service) => service.platform === selectedPlatform);
    return byPlatform.sort((a, b) => a.title.localeCompare(b.title));
  }, [selectedCategory, selectedPlatform]);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Saltar al contenido
      </a>
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
          services={filteredServices}
          totalFiltered={filteredServices.length}
        />
      </div>
    </>
  );
});

const App = () => (
  <Router>
    <div className="app-shell">
      <Header />
      <main id="main-content" className="container main">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </div>
  </Router>
);

export default App;
