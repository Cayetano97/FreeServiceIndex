

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
      className="block h-full group"
    >
      <Card className="h-full bg-card border-border/50 hover:border-foreground/20 transition-all duration-300 hover:shadow-sm relative overflow-hidden">
        <CardHeader className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="p-2 bg-secondary/50 rounded-lg group-hover:bg-secondary transition-colors">
              <img
                src={icon}
                alt={`${title} icon`}
                className="w-6 h-6"
                loading="lazy"
              />
            </div>
            <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <div className="space-y-1">
            <h3 className="font-semibold text-lg tracking-tight text-foreground group-hover:text-primary transition-colors">
              {title}
            </h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-xs font-normal bg-secondary text-secondary-foreground hover:bg-secondary/80">
                {category}
              </Badge>
              {platform && (
                <Badge variant="outline" className="text-xs font-normal border-border text-muted-foreground">
                  {platform}
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {description}
          </p>
        </CardContent>
      </Card>
    </a>
  );
});

export default ServiceCard;
