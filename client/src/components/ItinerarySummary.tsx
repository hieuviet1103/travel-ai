import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Users, DollarSign } from "lucide-react";

interface ItinerarySummaryProps {
  destination: string;
  dateRange: string;
  travelers: number;
  budget: string;
  totalDays: number;
}

export default function ItinerarySummary({
  destination,
  dateRange,
  travelers,
  budget,
  totalDays,
}: ItinerarySummaryProps) {
  const getBudgetLabel = (budget: string) => {
    switch (budget) {
      case 'budget':
        return 'Tiết kiệm';
      case 'medium':
        return 'Trung bình';
      case 'luxury':
        return 'Cao cấp';
      default:
        return budget;
    }
  };

  return (
    <Card data-testid="card-itinerary-summary">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          {destination}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{dateRange}</span>
          </div>
          <Badge variant="secondary">{totalDays} ngày</Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{travelers} người</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <DollarSign className="h-4 w-4" />
            <span>{getBudgetLabel(budget)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
