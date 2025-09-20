import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Guides from "./components/Guides";
import CategoryScroll from "./components/CategoryScroll";
import ServiceGrid from "./components/ServiceGrid";
import ParticlesBackground from "./components/ParticlesBackground";
import { Analytics } from "@vercel/analytics/react";
import servicesData from "./db/services.json";

const Navigation = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="flex justify-center space-x-4 mt-4 pb-4">
      <Link
        to="/"
        className={`
          px-6 py-2.5 rounded-lg transition-all duration-200 font-medium
          ${
            isHome
              ? "bg-primary text-primary-foreground shadow-lg scale-105"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }
        `}
      >
        Servicios
      </Link>
      <Link
        to="/guides"
        className={`
          px-6 py-2.5 rounded-lg transition-all duration-200 font-medium
          ${
            !isHome
              ? "bg-primary text-primary-foreground shadow-lg scale-105"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }
        `}
      >
        Guías
      </Link>
    </div>
  );
};

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  return (
    <>
      <CategoryScroll
        categories={servicesData.categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <ServiceGrid
        services={servicesData.services}
        selectedCategory={selectedCategory}
      />
    </>
  );
};

const App = () => (
  <Router>
    <div className="min-h-screen bg-background dark relative">
      <ParticlesBackground />
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/30 backdrop-blur-md">
        <Header />
        <Navigation />
      </div>
      <main className="mt-40 relative z-10">
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
