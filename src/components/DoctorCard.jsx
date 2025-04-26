import { Button } from "@/components/ui/button";

/**
 * Generic doctor card used everywhere.
 *
 * Props: every field that lives on a doctor object in App.jsx, plus
 *   • onBook  – optional → shows “Book Now” button when supplied
 *   • className – optional extra tailwind classes
 */
export default function DoctorCard({
  onBook,
  className = "",
  ...doctor      // grabs: name, department, specialty, qualification,
                 //        expertise, fee, image/avatar, etc.
}) {
  const {
    name,
    department,
    specialty,
    qualification,
    expertise = [],
    fee = 2000,                         // default if doctor has no fee key
    image,
    avatar,
  } = doctor;

  return (
    <div
      className={
        "flex flex-col rounded-2xl bg-white p-6 shadow-md hover:shadow-xl transition hover:-translate-y-1 " +
        className
      }
    >
      {/* photo */}
      <img
        src={avatar || image}
        alt={name}
        className="h-24 w-24 mx-auto rounded-full object-cover"
      />

      {/* name & basic info */}
      <h3 className="mt-4 text-center font-semibold text-primary">{name}</h3>
      <p className="text-center text-xs uppercase text-gray-500">
        {specialty || department}
      </p>
      <p className="mt-1 text-center text-gray-600">{qualification}</p>

      {/* expertise bullets */}
      {expertise.length > 0 && (
        <ul className="mt-3 list-disc list-inside space-y-1 overflow-y-auto text-xs text-gray-600 max-h-24">
          {expertise.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      )}

      {/* fee row (hidden if fee==0) */}
      {fee > 0 && (
        <p className="mt-4 text-center text-sm font-medium">
          Fee&nbsp;PKR&nbsp;{fee.toLocaleString()}
        </p>
      )}

      {/* CTA – only when a callback is provided */}
      {onBook && (
        <Button size="sm" className="mt-4" onClick={onBook}>
          Book Now
        </Button>
      )}
    </div>
  );
}
