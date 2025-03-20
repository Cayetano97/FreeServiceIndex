import { useState, Suspense, lazy } from "react";
import servicesData from "./db/services.json";
import Header from "./components/Header";
import { Analytics } from "@vercel/analytics/react";

const CategoryScroll = lazy(() => import("./components/CategoryScroll"));
const ServiceGrid = lazy(() => import("./components/ServiceGrid"));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

function App() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  return (
    <div className="min-h-screen bg-background dark">
      <Header />
      <main>
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
      </main>
      <Analytics />
    </div>
  );
}

export default App;
