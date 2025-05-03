// src/components/booking/ReviewStep.jsx
import { Button } from '@/components/ui/button';
import useConsultStore from '@/store/consultationStore';
import { useFormContext, useWatch } from 'react-hook-form';
import { Fragment, useEffect, useState } from 'react';

export default function ReviewStep({ doctor, onSubmit }) {
  const prev = useConsultStore(s => s.prev);

  /* ── grab form values reactively ───────────────────────────── */
  const { control, formState:{ isValid } } = useFormContext();
  const { slip, name, phone, email, slot } = useWatch({ control });
  const [slotStr, setSlotStr] = useState('');

  /* format the “slot” date only once it’s present */
  useEffect(() => {
    if (!(slot instanceof Date) || isNaN(slot)) return;

    setSlotStr(
      slot.toLocaleString('en-GB', {
        weekday : 'short',
        day     : 'numeric',
        month   : 'short',
        hour    : '2-digit',
        minute  : '2-digit',
        hour12  : false,
        timeZone: 'Asia/Karachi',
      })
    );
  }, [slot]);

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* ────────────── review summary ────────────────────────── */}
      <div className="rounded-xl border p-6 text-sm leading-6">
        <h4 className="mb-4 text-base font-semibold text-primary">
          Please confirm the details
        </h4>

        <dl className="grid gap-y-2 sm:grid-cols-[120px_1fr]">
          {/* doctor */}
          <dt className="font-medium text-gray-500">Doctor</dt>
          <dd>{doctor?.name}</dd>

          {/* appointment */}
          <dt className="font-medium text-gray-500">Slot</dt>
          <dd>{slotStr || '—'}</dd>

          {/* patient */}
          <dt className="font-medium text-gray-500">Name</dt>
          <dd>{name}</dd>

          <dt className="font-medium text-gray-500">Phone</dt>
          <dd>{phone}</dd>

          <dt className="font-medium text-gray-500">Email</dt>
          <dd>{email}</dd>

          {/* slip */}
          <dt className="font-medium text-gray-500">Slip</dt>
          <dd>
            {slip?.name}
            {slip && slip.type.startsWith('image/') && (
              <Fragment>
                <br />
                <img
                  src={URL.createObjectURL(slip)}
                  alt="Payment slip preview"
                  className="mt-2 max-h-40 rounded border"
                  onLoad={e => URL.revokeObjectURL(e.target.src)}
                />
              </Fragment>
            )}
          </dd>
        </dl>
      </div>

      {/* ────────────── navigation buttons ────────────────────── */}
      <div className="flex justify-between">
        <Button variant="outline" type="button" onClick={prev}>
          Back
        </Button>

        <Button
          type="submit"
          disabled={!isValid}
          className="bg-[#00bfa6] text-white hover:bg-[#00bfa6]/90 disabled:opacity-40"
        >
          Submit
        </Button>
      </div>
    </form>
  );
}
