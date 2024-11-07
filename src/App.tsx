import { useState } from 'react';
import servicesData from './db/services.json';
import Header from './components/Header';
import CategoryScroll from './components/CategoryScroll';
import ServiceGrid from './components/ServiceGrid';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <div className="min-h-screen bg-background dark">
      <Header />
      <main>
        <CategoryScroll
          categories={servicesData.categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <ServiceGrid
          services={servicesData.services}
          selectedCategory={selectedCategory}
        />
      </main>
    </div>
  );
}

export default App;