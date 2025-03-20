import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { memo } from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  category: string;
  icon: string;
  downloadLink: string;
}

const ServiceCard = memo(function ServiceCard({
  title,
  description,
  category,
  icon,
  downloadLink,
}: ServiceCardProps) {
  return (
    <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-background/80 to-background backdrop-blur-sm border-opacity-50">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.1, y: -2 }}
            className="bg-secondary/10 p-3 rounded-xl backdrop-blur-sm"
            style={{ willChange: 'transform' }}
          >
            <a href={downloadLink} target="_blank" rel="noopener noreferrer" className="block">
              <img
                src={icon}
                alt={`${title} icon`}
                className="w-6 h-6 transition-all duration-300 group-hover:brightness-110"
                loading="lazy"
                decoding="async"
              />
            </a>
          </motion.div>

          <Badge
            variant="secondary"
            className="bg-secondary/10 hover:bg-secondary/20 transition-colors duration-300 flex items-center gap-2 px-3 py-1.5 rounded-full"
          >
            <span className="text-sm font-medium">{category}</span>
          </Badge>
        </div>

        <h3 className="text-xl font-semibold tracking-tight pt-2">
          <a
            href={downloadLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-primary to-primary bg-[length:0%_2px] bg-no-repeat bg-left-bottom group-hover:bg-[length:100%_2px] transition-all duration-500"
          >
            {title}
          </a>
        </h3>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </CardContent>

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />
    </Card>
  );
});

export default ServiceCard;
