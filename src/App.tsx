import { useState, Suspense, lazy } from "react";
import servicesData from "./db/services.json";
import Header from "./components/Header";
import { Analytics } from "@vercel/analytics/react";

const CategoryScroll = lazy(() => import("./components/CategoryScroll"));
const ServiceGrid = lazy(() => import("./components/ServiceGrid"));
const Guides = lazy(() => import("./components/Guides"));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

function App() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [activeSection, setActiveSection] = useState<"links" | "guides">("links");

  return (
    <div className="min-h-screen bg-background dark">
      <div className="fixed top-0 left-0 right-0 z-50 bg-background">
        <Header />
        <div className="flex justify-center space-x-4 mt-4 pb-4">
          <button 
            onClick={() => setActiveSection("links")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeSection === "links" 
                ? "bg-primary text-primary-foreground" 
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            Enlaces
          </button>
          <button 
            onClick={() => setActiveSection("guides")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeSection === "guides" 
                ? "bg-primary text-primary-foreground" 
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            Guías
          </button>
        </div>
      </div>
      <main className="mt-40">
        {activeSection === "links" ? (
          <>
            <Suspense fallback={<LoadingFallback />}>
              <CategoryScroll
                categories={servicesData.categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </Suspense>
            <Suspense fallback={<LoadingFallback />}>
              <ServiceGrid
                services={servicesData.services}
                selectedCategory={selectedCategory}
              />
            </Suspense>
          </>
        ) : (
          <Suspense fallback={<LoadingFallback />}>
            <Guides />
          </Suspense>
        )}
      </main>
      <Analytics />
    </div>
  );
}

export default App;
