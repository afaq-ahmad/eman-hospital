import { useMemo, useState } from 'react';
import DoctorCard from '@/components/DoctorCard';
import BookingDialog from '@/components/BookingDialog';

export default function OnlineConsultation({ doctors = [] }) {
  // show only flagged docs; fallback to all if none flagged
  const docs = useMemo(
    () =>
      doctors.some(d => d.online)
        ? doctors.filter(d => d.online)
        : doctors,
    [doctors]
  );

  const [sel, setSel] = useState(null);

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="mb-8 text-center text-3xl font-bold">
        Online Consultation
      </h2>

      {docs.length === 0 ? (
        <p className="text-center text-gray-500">
          No doctors available for virtual consultation right now.
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {docs.map(d => (
            <DoctorCard
              key={d.key}
              {...d}
              fee={2000}
              onBook={() => setSel(d)}
            />
          ))}
        </div>
      )}

      <BookingDialog
        doctor={sel}
        open={!!sel}
        onClose={() => setSel(null)}
      />
    </section>
  );
}
