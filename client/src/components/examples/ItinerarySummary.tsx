import ItinerarySummary from '../ItinerarySummary';

export default function ItinerarySummaryExample() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <ItinerarySummary
        destination="Paris, France"
        dateRange="20/10/2024 - 25/10/2024"
        travelers={2}
        budget="medium"
        totalDays={5}
      />
    </div>
  );
}
