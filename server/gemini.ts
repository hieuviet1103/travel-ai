import { GoogleGenAI } from "@google/genai";

// DON'T DELETE THIS COMMENT
// Follow these instructions when using this blueprint:
// - Note that the newest Gemini model series is "gemini-2.5-flash" or gemini-2.5-pro"
//   - do not change this unless explicitly requested by the user

// This API key is from Gemini Developer API Key, not vertex AI API Key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

interface TripRequest {
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  budget: string;
  interests: string[];
}

interface Activity {
  id: string;
  time: string;
  title: string;
  description: string;
  type: 'attraction' | 'restaurant' | 'activity';
  location: string;
  aiSuggested: boolean;
  lat?: number;
  lng?: number;
}

interface DayItinerary {
  day: number;
  date: string;
  activities: Activity[];
}

interface TripItinerary {
  destination: string;
  dateRange: string;
  travelers: number;
  budget: string;
  totalDays: number;
  days: DayItinerary[];
  locations: Array<{
    id: string;
    name: string;
    lat: number;
    lng: number;
    type: 'attraction' | 'restaurant' | 'hotel';
  }>;
}

const interestDescriptions: Record<string, string> = {
  culture: 'văn hóa, lịch sử, bảo tàng, di tích',
  food: 'ẩm thực, nhà hàng, món ăn địa phương',
  nature: 'thiên nhiên, công viên, phong cảnh',
  adventure: 'phiêu lưu, thể thao mạo hiểm',
  relaxation: 'thư giãn, spa, nghỉ dưỡng',
  shopping: 'mua sắm, chợ, trung tâm thương mại',
};

export async function generateTripItinerary(request: TripRequest): Promise<TripItinerary> {
  const { destination, startDate, endDate, travelers, budget, interests } = request;
  
  const budgetDescriptions: Record<string, string> = {
    budget: 'tiết kiệm (budget-friendly)',
    medium: 'trung bình (moderate)',
    luxury: 'cao cấp (luxury)',
  };

  const interestsList = interests.map(i => interestDescriptions[i] || i).join(', ');
  
  const prompt = `Bạn là một chuyên gia lập kế hoạch du lịch. Hãy tạo một lịch trình du lịch chi tiết cho chuyến đi sau:

Điểm đến: ${destination}
Ngày bắt đầu: ${startDate}
Ngày kết thúc: ${endDate}
Số người: ${travelers}
Ngân sách: ${budgetDescriptions[budget]}
Sở thích: ${interestsList || 'không có sở thích cụ thể'}

Hãy trả về JSON với cấu trúc sau (QUAN TRỌNG: chỉ trả về JSON, không có text nào khác):
{
  "days": [
    {
      "day": 1,
      "date": "DD/MM/YYYY",
      "activities": [
        {
          "time": "HH:MM",
          "title": "Tên địa điểm/hoạt động",
          "description": "Mô tả chi tiết",
          "type": "attraction|restaurant|activity",
          "location": "Địa chỉ cụ thể",
          "lat": vĩ độ (số thực),
          "lng": kinh độ (số thực)
        }
      ]
    }
  ]
}

Lưu ý:
- Mỗi ngày nên có 3-5 hoạt động
- Bao gồm bữa sáng, trưa, tối ở các nhà hàng địa phương
- Thêm tọa độ GPS thực tế (lat, lng) cho mỗi địa điểm
- Sắp xếp thời gian hợp lý trong ngày
- Đề xuất các địa điểm phù hợp với sở thích và ngân sách`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        responseMimeType: "application/json",
      },
      contents: prompt,
    });

    const rawJson = response.text;
    if (!rawJson) {
      throw new Error("Empty response from Gemini");
    }

    const aiResponse = JSON.parse(rawJson);
    
    // Process the response to match our interface
    const days: DayItinerary[] = aiResponse.days.map((day: any, index: number) => ({
      day: day.day || index + 1,
      date: day.date,
      activities: day.activities.map((activity: any, actIndex: number) => ({
        id: `${day.day}-${actIndex}`,
        time: activity.time,
        title: activity.title,
        description: activity.description,
        type: activity.type || 'attraction',
        location: activity.location,
        aiSuggested: true,
        lat: activity.lat,
        lng: activity.lng,
      })),
    }));

    // Extract unique locations for map
    const locationsMap = new Map();
    days.forEach(day => {
      day.activities.forEach(activity => {
        if (activity.lat && activity.lng) {
          const key = `${activity.lat}-${activity.lng}`;
          if (!locationsMap.has(key)) {
            locationsMap.set(key, {
              id: activity.id,
              name: activity.title,
              lat: activity.lat,
              lng: activity.lng,
              type: activity.type === 'restaurant' ? 'restaurant' : 'attraction',
            });
          }
        }
      });
    });

    const locations = Array.from(locationsMap.values());

    return {
      destination,
      dateRange: `${startDate} - ${endDate}`,
      travelers,
      budget,
      totalDays: days.length,
      days,
      locations,
    };
  } catch (error) {
    console.error('Error generating itinerary:', error);
    throw new Error(`Failed to generate itinerary: ${error}`);
  }
}
