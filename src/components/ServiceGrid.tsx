import { motion } from "framer-motion";
import { useMemo } from "react";
import ServiceCard from "./ServiceCard";

interface Service {
  id: number;
  title: string;
  description: string;
  category: string;
  icon: string;
  downloadLink: string;
}

interface ServiceGridProps {
  services: Service[];
  selectedCategory: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
};

const ServiceGrid = ({ services, selectedCategory }: ServiceGridProps) => {
  const filteredAndSortedServices = useMemo(() => {
    const filtered = selectedCategory === "Todos"
      ? services
      : services.filter(service => service.category === selectedCategory);
    return filtered.sort((a, b) => a.title.localeCompare(b.title));
  }, [services, selectedCategory]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-6 mx-auto max-w-7xl"
      style={{ willChange: 'transform' }}
    >
      {filteredAndSortedServices.map(service => (
        <motion.div
          key={service.id || service.title}
          variants={itemVariants}
          className="h-full"
          style={{ willChange: 'transform' }}
        >
          <ServiceCard {...service} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ServiceGrid;
