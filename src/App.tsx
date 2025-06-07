import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import { Analytics } from "@vercel/analytics/react";
import Guides from "./components/Guides";
import CategoryScroll from "./components/CategoryScroll";
import ServiceGrid from "./components/ServiceGrid";
import { useState } from "react";
import servicesData from "./db/services.json";

function Home() {
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
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background dark">
        <div className="fixed top-0 left-0 right-0 z-50 bg-background">
          <Header />
          <div className="flex justify-center space-x-4 mt-4 pb-4">
            <Link 
              to="/"
              className="px-4 py-2 rounded-lg transition-colors bg-muted text-muted-foreground hover:bg-muted/80"
            >
              Enlaces
            </Link>
            <Link 
              to="/guides"
              className="px-4 py-2 rounded-lg transition-colors bg-muted text-muted-foreground hover:bg-muted/80"
            >
              Guías
            </Link>
          </div>
        </div>
        <main className="mt-40">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/guides" element={<Guides />} />
          </Routes>
        </main>
        <Analytics />
      </div>
    </Router>
  );
}

export default App;
