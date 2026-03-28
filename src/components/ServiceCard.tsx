

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { memo } from "react";
import { ExternalLink } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  category: string;
  icon: string;
  downloadLink: string;
  platform?: string;
}

const ServiceCard = memo(function ServiceCard({
  title,
  description,
  category,
  icon,
  downloadLink,
  platform,
}: ServiceCardProps) {
  return (
    <a
      href={downloadLink}
      target="_blank"
      rel="noopener noreferrer"
      className="service-card-link"
    >
      <Card className="service-card">
        <CardHeader className="service-card__header">
          <div className="service-card__top">
            <div className="service-card__icon">
              <img
                src={icon}
                alt={`${title} icon`}
                className="service-card__icon-img"
                loading="lazy"
              />
            </div>
            <ExternalLink className="service-card__link-icon" />
          </div>

          <div className="service-card__meta">
            <h3 className="service-card__title">
              {title}
            </h3>
            <div className="service-card__badges">
              <Badge variant="secondary">
                {category}
              </Badge>
              {platform && (
                <Badge variant="outline">
                  {platform}
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <p className="service-card__description">
            {description}
          </p>
        </CardContent>
      </Card>
    </a>
  );
});

export default ServiceCard;
