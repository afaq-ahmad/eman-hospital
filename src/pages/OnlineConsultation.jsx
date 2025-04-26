import { useMemo, useState } from 'react';
import DoctorCard from '@/components/DoctorCard';
import BookingDialog from '@/components/BookingDialog';

export default function OnlineConsultation({ doctors }) {
  // take only doctors that offer virtual visits. add `online:true`
  const docs = useMemo(
    () => doctors.filter(d => d.online),
    [doctors]
  );
  const [sel,  setSel]    = useState(null);

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="mb-8 text-center text-3xl font-bold">Online Consultation</h2>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        {docs.map(d => (
          <DoctorCard
            key={d.id}
            {...d}
            fee={2000}
            onBook={() => setSel(d)}
          />
        ))}
      </div>

      <BookingDialog
        doctor={sel}
        open={!!sel}
        onClose={() => setSel(null)}
      />
    </section>
  );
}
