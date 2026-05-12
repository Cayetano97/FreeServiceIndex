import * as React from "react";

import { cn } from "@/lib/utils";

function Card(
  { className, ref, ...props }: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> },
) {
  return <div ref={ref} className={cn("card", className)} {...props} />;
}
Card.displayName = "Card";

function CardHeader(
  { className, ref, ...props }: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> },
) {
  return <div ref={ref} className={cn("card__header", className)} {...props} />;
}
CardHeader.displayName = "CardHeader";

function CardContent(
  { className, ref, ...props }: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> },
) {
  return (
    <div ref={ref} className={cn("card__content", className)} {...props} />
  );
}
CardContent.displayName = "CardContent";

export { Card, CardHeader, CardContent };
