import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ServiceCardProps {
  title: string;
  description: string;
  category: string;
  icon: string;
  downloadLink: string;
}

export default function ServiceCard({
  title,
  description,
  category,
  icon,
  downloadLink,
}: ServiceCardProps) {
  return (
    <Card className="group hover:border-primary/50 transition-all duration-300 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <div className="bg-secondary/80 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
            <img src={icon} alt={`${title} icon`} className="w-5 h-5" />
          </div>
          <Badge variant="secondary" className="bg-secondary/80">
            {category}
          </Badge>
        </div>
        <h3 className="text-xl font-semibold tracking-tight pt-2 text-primary">
          <a href={downloadLink} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </h3>
      </CardHeader>
      <div className="absolute inset-x-0 bottom-0 h-px bg-border" />
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
