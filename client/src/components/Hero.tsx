import { Button } from "@/components/ui/button";
import { Sparkles, Map, Calendar } from "lucide-react";

interface HeroProps {
  onGetStarted: () => void;
}

export default function Hero({ onGetStarted }: HeroProps) {
  return (
    <div className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&q=80)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">Powered by AI</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
          Lên kế hoạch du lịch<br />với sức mạnh AI
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
          Tạo lịch trình du lịch hoàn hảo chỉ trong vài giây. AI sẽ gợi ý địa điểm, hoạt động và lộ trình phù hợp với sở thích của bạn.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="text-lg px-8"
            onClick={onGetStarted}
            data-testid="button-get-started"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Bắt đầu ngay
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="text-lg px-8 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
            data-testid="button-explore"
          >
            <Map className="mr-2 h-5 w-5" />
            Khám phá
          </Button>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8 mt-12 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-teal" />
            <span>Lịch trình chi tiết</span>
          </div>
          <div className="flex items-center gap-2">
            <Map className="h-5 w-5 text-teal" />
            <span>Bản đồ tương tác</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-teal" />
            <span>Gợi ý thông minh</span>
          </div>
        </div>
      </div>
    </div>
  );
}
