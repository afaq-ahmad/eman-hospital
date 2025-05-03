// ────────────────────────────────────────────────────────────────
//  DetailsStep.jsx   —   2 of 3 in the multi-step BookingDialog
//  Collects patient information + preferred slot (with clash-safety)
// ────────────────────────────────────────────────────────────────
import { Fragment, useMemo, useState } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import useConsultStore from '@/store/consultationStore';

/**
 * Build an array of time strings at a given interval between two hours.
 * Default → 08 :00 to 22 :00 in 30-minute steps → 28 slots total.
 */
function buildTimes({ from = 8, to = 22, step = 30 } = {}) {
  const out = [];
  for (let m = from * 60; m < to * 60; m += step) {
    const h = String(Math.floor(m / 60)).padStart(2, '0');
    const min = String(m % 60).padStart(2, '0');
    out.push(`${h}:${min}`);
  }
  return out;
}
const ALL_TIMES = buildTimes();                  // ["08:00", … "21:30"]

export default function DetailsStep({ control: ctlProp, doctor }) {
  // Support both “passed-in control” and context-based access
  const { control, setValue } = useFormContext(); 

  const { next, prev } = useConsultStore();

  /* ─────── watched form values ─────────────────────────────── */
  const name      = useWatch({ control, name: 'name'  });
  const phone     = useWatch({ control, name: 'phone' });
  const email     = useWatch({ control, name: 'email' });
  const slotValue = useWatch({ control, name: 'slot'  }); // Date - or undefined

  /* ─────── local state ─────────────────────────────────────── */
  const [dateStr, setDateStr] = useState('');              // YYYY-MM-DD

  /**
   * Compute free slots for the selected date.
   * Back-end supplies doctor.booked = [ISO strings that are ALREADY taken].
   */
  const freeSlots = useMemo(() => {
    if (!dateStr) return [];

    // If the API did not yet deliver the array, assume everything is free
    if (!doctor?.booked?.length) return ALL_TIMES;

    // 1️⃣ booked for that particular date → ["15:30", …]
    const bookedToday = doctor.booked
      .filter((iso) => iso.startsWith(dateStr))
      .map((iso) => new Date(iso).toLocaleTimeString('en-GB', {
        hour:   '2-digit',
        minute: '2-digit',
        hour12: false,
      }));

    // 2️⃣ remainder = free
    return ALL_TIMES.filter((t) => !bookedToday.includes(t));
  }, [doctor?.booked, dateStr]);

  /* ─────── helpers ─────────────────────────────────────────── */
  const selectSlot = (t) => {
    const iso = `${dateStr}T${t}:00+05:00`;     // Asia/Karachi (UTC+5)
    const when = new Date(iso);

    if (when < new Date()) return;              // guard against past-date pick

    setValue('slot', when, { shouldValidate: true });
  };

  const allValid =
    name?.length > 0 &&
    phone?.length > 0 &&
    email?.length > 0 &&
    slotValue instanceof Date &&
    !isNaN(slotValue) &&
    slotValue > new Date();                     // must be in the future

  /* ─────── render ──────────────────────────────────────────── */
  return (
    <Fragment>
      {/* Header / progress indicator (optional) */}
      <h3 className="mb-6 text-lg font-semibold text-primary">2 / 3  Patient Details</h3>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Full Name */}
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              placeholder="Full Name"
              className="w-full rounded border p-3 text-sm"
            />
          )}
        />

        {/* WhatsApp / Phone */}
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              placeholder="0300-1234567"
              className="w-full rounded border p-3 text-sm"
            />
          )}
        />

        {/* Email */}
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="email"
              placeholder="you@email.com"
              className="w-full rounded border p-3 text-sm md:col-span-2"
            />
          )}
        />

        {/* Preferred Date */}
        <input
          type="date"
          value={dateStr}
          onChange={(e) => {
            setDateStr(e.target.value);
            // reset previously chosen slot when date changes
            setValue('slot', undefined, { shouldValidate: true });
          }}
          className="w-full rounded border p-3 text-sm"
        />

        {/* Time-slot buttons */}
        {dateStr && (
          <div className="md:col-span-2">
            <p className="mb-2 text-sm font-medium">Choose 30-min slot:</p>
            <div className="flex flex-wrap gap-2">
              {ALL_TIMES.map((t) => {
                const taken  = !freeSlots.includes(t);
                const active =
                  slotValue instanceof Date &&
                  slotValue.toLocaleTimeString('en-GB', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  }) === t;

                return (
                  <button
                    key={t}
                    disabled={taken}
                    onClick={() => !taken && selectSlot(t)}
                    className={`rounded-full border px-3 py-1 text-xs transition
                      ${active ? 'bg-primary text-white'
                        : taken ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                               : 'bg-white text-gray-700 hover:bg-gray-100'}
                    `}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={prev}>
          Back
        </Button>
        <Button disabled={!allValid} onClick={next}>
          Continue
        </Button>
      </div>
    </Fragment>
  );
}
