import {
  LazyMotion,
  AnimatePresence,
  m,
  domAnimation,
  useReducedMotion,
} from "framer-motion";
import ServiceCard from "./ServiceCard";

interface Service {
  id: number;
  title: string;
  description: string;
  category: string;
  icon: string;
  downloadLink: string;
  platform?: string;
}

interface ServiceGridProps {
  services: Service[];
  totalFiltered?: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  exit: {
    y: -10,
    opacity: 0,
    transition: {
      duration: 0.15,
      ease: "easeIn",
    },
  },
};

const ServiceGrid = ({ services, totalFiltered }: ServiceGridProps) => {
  const prefersReducedMotion = useReducedMotion();

  const effectiveContainerVariants = prefersReducedMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : containerVariants;

  const effectiveItemVariants = prefersReducedMotion
    ? {
        hidden: { opacity: 1, y: 0 },
        show: { opacity: 1, y: 0 },
        exit: { opacity: 1, y: 0 },
      }
    : itemVariants;

  return (
    <LazyMotion features={domAnimation}>
      <span className="sr-only" aria-live="polite">
        {totalFiltered} servicios encontrados
      </span>
      <m.div
        variants={effectiveContainerVariants}
        initial="hidden"
        animate="show"
        className="service-grid"
      >
        <AnimatePresence initial={false} mode="popLayout">
          {services.map((service) => (
            <m.div
              key={service.id || service.title}
              variants={effectiveItemVariants}
              className="service-grid__item"
            >
              <ServiceCard {...service} />
            </m.div>
          ))}
        </AnimatePresence>
      </m.div>
    </LazyMotion>
  );
};

export default ServiceGrid;
