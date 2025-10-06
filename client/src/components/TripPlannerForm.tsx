import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon, MapPin, Users, Sparkles } from "lucide-react";
import { format } from "date-fns";

interface TripPlannerFormProps {
  onSubmit: (data: TripFormData) => void;
  isLoading?: boolean;
}

export interface TripFormData {
  destination: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  travelers: string;
  budget: string;
  interests: string[];
}

export default function TripPlannerForm({ onSubmit, isLoading = false }: TripPlannerFormProps) {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [travelers, setTravelers] = useState("2");
  const [budget, setBudget] = useState("medium");
  const [interests, setInterests] = useState<string[]>([]);

  const interestOptions = [
    { id: "culture", label: "Culture & History" },
    { id: "food", label: "Food & Dining" },
    { id: "nature", label: "Nature & Outdoors" },
    { id: "adventure", label: "Adventure" },
    { id: "relaxation", label: "Relaxation" },
    { id: "shopping", label: "Shopping" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      destination,
      startDate,
      endDate,
      travelers,
      budget,
      interests,
    });
  };

  const toggleInterest = (interestId: string) => {
    setInterests(prev =>
      prev.includes(interestId)
        ? prev.filter(i => i !== interestId)
        : [...prev, interestId]
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" data-testid="form-trip-planner">
      <div className="space-y-2">
        <Label htmlFor="destination" className="text-base font-semibold">
          Bạn muốn đi đâu?
        </Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            id="destination"
            placeholder="Ví dụ: Paris, Tokyo, New York..."
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="pl-10"
            required
            data-testid="input-destination"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-base font-semibold">Ngày bắt đầu</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
                data-testid="button-start-date"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "dd/MM/yyyy") : "Chọn ngày"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label className="text-base font-semibold">Ngày kết thúc</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
                data-testid="button-end-date"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "dd/MM/yyyy") : "Chọn ngày"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
                disabled={(date) => startDate ? date < startDate : false}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="travelers" className="text-base font-semibold">
            Số người tham gia
          </Label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="travelers"
              type="number"
              min="1"
              value={travelers}
              onChange={(e) => setTravelers(e.target.value)}
              className="pl-10"
              required
              data-testid="input-travelers"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="budget" className="text-base font-semibold">
            Ngân sách
          </Label>
          <Select value={budget} onValueChange={setBudget}>
            <SelectTrigger data-testid="select-budget">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="budget">Tiết kiệm</SelectItem>
              <SelectItem value="medium">Trung bình</SelectItem>
              <SelectItem value="luxury">Cao cấp</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-base font-semibold">Sở thích của bạn</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {interestOptions.map((interest) => (
            <div key={interest.id} className="flex items-center space-x-2">
              <Checkbox
                id={interest.id}
                checked={interests.includes(interest.id)}
                onCheckedChange={() => toggleInterest(interest.id)}
                data-testid={`checkbox-${interest.id}`}
              />
              <Label
                htmlFor={interest.id}
                className="text-sm font-normal cursor-pointer"
              >
                {interest.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={isLoading || !destination || !startDate || !endDate}
        data-testid="button-generate-itinerary"
      >
        <Sparkles className="mr-2 h-5 w-5" />
        {isLoading ? "Đang tạo lịch trình..." : "Tạo lịch trình AI"}
      </Button>
    </form>
  );
}
