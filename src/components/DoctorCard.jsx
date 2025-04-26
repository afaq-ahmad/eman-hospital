import { Button } from '@/components/ui/button';

export default function DoctorCard({ fee, onBook, ...props }) {
  // reuse your existing markup ⬇️ and add the fee + button
  return (
    <div className="flex flex-col rounded-2xl bg-white p-6 shadow-md hover:shadow-xl transition hover:-translate-y-1">
      <img src={props.avatar || props.image} alt={props.name} className="h-24 w-24 mx-auto rounded-full object-cover" />
      <h3 className="mt-4 text-center font-semibold text-primary">{props.name}</h3>
      <p className="text-center text-xs uppercase text-gray-500">{props.specialty || props.department}</p>
      <p className="mt-1 text-center text-gray-600">{props.qualification}</p>

      <p className="mt-4 text-center text-sm font-medium">Fee PKR {fee.toLocaleString()}</p>
      <Button size="sm" className="mt-4" onClick={onBook}>Book Now</Button>
    </div>
  );
}
