import { useState, useRef } from "react";
import Hero from "@/components/Hero";
import TripPlannerForm from "@/components/TripPlannerForm";
import LoadingState from "@/components/LoadingState";
import DayItinerary from "@/components/DayItinerary";
import ItinerarySummary from "@/components/ItinerarySummary";
import InteractiveMap from "@/components/InteractiveMap";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";
import { format } from "date-fns";
import type { TripFormData } from "@/components/TripPlannerForm";

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [itinerary, setItinerary] = useState<any>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const handleGetStarted = () => {
    setShowForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleFormSubmit = async (data: TripFormData) => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/trip/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          destination: data.destination,
          startDate: data.startDate ? format(data.startDate, 'dd/MM/yyyy') : '',
          endDate: data.endDate ? format(data.endDate, 'dd/MM/yyyy') : '',
          travelers: parseInt(data.travelers),
          budget: data.budget,
          interests: data.interests,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to generate itinerary');
      }

      const itineraryData = await response.json();
      setItinerary(itineraryData);
    } catch (error: any) {
      console.error('Error generating itinerary:', error);
      alert('Có lỗi xảy ra khi tạo lịch trình. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = () => {
    console.log('Share itinerary');
  };

  const handleDownload = () => {
    console.log('Download itinerary');
  };

  return (
    <div className="min-h-screen bg-background">
      {!showForm && !itinerary && <Hero onGetStarted={handleGetStarted} />}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {showForm && !itinerary && !isLoading && (
          <div ref={formRef} className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Tạo lịch trình của bạn</h2>
              <p className="text-muted-foreground">
                Điền thông tin bên dưới và để AI tạo lịch trình hoàn hảo cho bạn
              </p>
            </div>
            <Card className="p-6">
              <TripPlannerForm onSubmit={handleFormSubmit} />
            </Card>
          </div>
        )}

        {isLoading && <LoadingState />}

        {itinerary && !isLoading && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">Lịch trình của bạn</h2>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleShare} data-testid="button-share">
                  <Share2 className="h-4 w-4 mr-2" />
                  Chia sẻ
                </Button>
                <Button variant="outline" onClick={handleDownload} data-testid="button-download">
                  <Download className="h-4 w-4 mr-2" />
                  Tải xuống
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <ItinerarySummary {...itinerary} />
                
                <div className="lg:hidden h-[400px]">
                  <InteractiveMap locations={itinerary.locations} />
                </div>

                {itinerary.days.map((day: any) => (
                  <DayItinerary key={day.day} {...day} />
                ))}
              </div>

              <div className="hidden lg:block">
                <div className="sticky top-24 h-[calc(100vh-8rem)]">
                  <InteractiveMap locations={itinerary.locations} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
