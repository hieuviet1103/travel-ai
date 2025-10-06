import DayItinerary from '../DayItinerary';

export default function DayItineraryExample() {
  const mockActivities = [
    {
      id: '1',
      time: '09:00',
      title: 'Tháp Eiffel',
      description: 'Tham quan biểu tượng nổi tiếng của Paris, ngắm cảnh thành phố từ tầng đỉnh',
      type: 'attraction' as const,
      location: 'Champ de Mars, Paris',
      aiSuggested: true,
    },
    {
      id: '2',
      time: '12:30',
      title: 'Le Jules Verne',
      description: 'Nhà hàng cao cấp với ẩm thực Pháp tinh tế',
      type: 'restaurant' as const,
      location: 'Eiffel Tower, 2nd Floor',
      aiSuggested: false,
    },
    {
      id: '3',
      time: '15:00',
      title: 'Bảo tàng Louvre',
      description: 'Khám phá bộ sưu tập nghệ thuật lớn nhất thế giới',
      type: 'attraction' as const,
      location: 'Rue de Rivoli, Paris',
      aiSuggested: true,
    },
  ];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <DayItinerary
        day={1}
        date="20/10/2024"
        activities={mockActivities}
      />
    </div>
  );
}
