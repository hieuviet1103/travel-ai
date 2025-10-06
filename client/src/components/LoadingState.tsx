import { Sparkles } from "lucide-react";

export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4" data-testid="loading-state">
      <div className="relative">
        <Sparkles className="h-12 w-12 text-primary animate-pulse" />
        <div className="absolute inset-0 animate-ping">
          <Sparkles className="h-12 w-12 text-primary opacity-30" />
        </div>
      </div>
      <h3 className="mt-6 text-xl font-semibold">AI đang tạo lịch trình cho bạn...</h3>
      <p className="mt-2 text-muted-foreground text-center max-w-md">
        Chúng tôi đang phân tích sở thích của bạn và tìm kiếm những địa điểm tuyệt vời nhất
      </p>
      <div className="flex gap-2 mt-6">
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
      </div>
    </div>
  );
}
