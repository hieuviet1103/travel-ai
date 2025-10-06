import TripPlannerForm from '../TripPlannerForm';

export default function TripPlannerFormExample() {
  const handleSubmit = (data: any) => {
    console.log('Trip data submitted:', data);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <TripPlannerForm onSubmit={handleSubmit} />
    </div>
  );
}
