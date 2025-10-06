import InteractiveMap from '../InteractiveMap';

export default function InteractiveMapExample() {
  const mockLocations = [
    { id: '1', name: 'Eiffel Tower', lat: 48.8584, lng: 2.2945, type: 'attraction' as const },
    { id: '2', name: 'Louvre Museum', lat: 48.8606, lng: 2.3376, type: 'attraction' as const },
    { id: '3', name: 'Le Jules Verne', lat: 48.8583, lng: 2.2945, type: 'restaurant' as const },
    { id: '4', name: 'Hotel Plaza Athénée', lat: 48.8662, lng: 2.3042, type: 'hotel' as const },
  ];

  return (
    <div className="w-full h-[600px] p-6">
      <InteractiveMap locations={mockLocations} />
    </div>
  );
}
