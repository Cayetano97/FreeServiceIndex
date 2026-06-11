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

const ServiceGrid = ({ services, totalFiltered }: ServiceGridProps) => {
  return (
    <>
      <span className="sr-only" aria-live="polite">
        {totalFiltered} servicios encontrados
      </span>
      <div className="service-grid">
        {services.map((service, i) => (
          <div
            key={service.id || service.title}
            className="service-grid__item"
            style={{ "--i": i + 1 } as React.CSSProperties}
          >
            <ServiceCard {...service} />
          </div>
        ))}
      </div>
    </>
  );
};

export default ServiceGrid;
