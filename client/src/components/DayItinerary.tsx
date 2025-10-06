import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Utensils, Camera, Sparkles } from "lucide-react";

interface Activity {
  id: string;
  time: string;
  title: string;
  description: string;
  type: 'attraction' | 'restaurant' | 'activity';
  location: string;
  aiSuggested?: boolean;
}

interface DayItineraryProps {
  day: number;
  date: string;
  activities: Activity[];
}

export default function DayItinerary({ day, date, activities }: DayItineraryProps) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'restaurant':
        return <Utensils className="h-4 w-4" />;
      case 'attraction':
        return <Camera className="h-4 w-4" />;
      default:
        return <MapPin className="h-4 w-4" />;
    }
  };

  return (
    <Card data-testid={`card-day-${day}`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Ngày {day}</span>
          <span className="text-sm font-normal text-muted-foreground">{date}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className="relative pl-8 pb-6 last:pb-0"
            data-testid={`activity-${activity.id}`}
          >
            {index < activities.length - 1 && (
              <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-border" />
            )}
            <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-teal text-white flex items-center justify-center text-xs font-semibold">
              {index + 1}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{activity.time}</span>
                </div>
                {activity.aiSuggested && (
                  <Badge variant="secondary" className="bg-chart-3/10 text-chart-3 border-0">
                    <Sparkles className="h-3 w-3 mr-1" />
                    AI
                  </Badge>
                )}
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {getActivityIcon(activity.type)}
                  <h4 className="font-semibold">{activity.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
                <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>{activity.location}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
