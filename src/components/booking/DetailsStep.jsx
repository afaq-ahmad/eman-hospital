// ────────────────────────────────────────────────────────────────
//  DetailsStep.jsx   —   2 of 3 in the multi-step BookingDialog
//  Collects patient information + preferred slot
// ────────────────────────────────────────────────────────────────
import { Fragment, useMemo, useState } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import useConsultStore from '@/store/consultationStore';

/**
 * Build 30-min intervals from 08 :00 → 22 :00.
 * Output strings like "08:00", "08:30", … "21:30".
 */
function buildTimes() {
  const out = [];
  for (let h = 8; h < 22; h++) {
    out.push(`${h.toString().padStart(2, '0')}:00`);
    out.push(`${h.toString().padStart(2, '0')}:30`);
  }
  return out;
}
const ALL_TIMES = buildTimes();

export default function DetailsStep({ control, doctor }) {
  const { next, prev } = useConsultStore();

  /* Watch   ———————————————————————————————— */
  const name      = useWatch({ control, name: 'name'  });
  const phone     = useWatch({ control, name: 'phone' });
  const email     = useWatch({ control, name: 'email' });
  const slotValue = useWatch({ control, name: 'slot'  });

  /* Local state   ————————————————————————— */
  const [dateStr, setDateStr] = useState('');

  /**
   * Available time-buttons for the chosen date.
   * If the API returns a list of ISO strings under doctor.slots,
   * keep only those that belong to the current date.
   * Fallback → show all 30-min slots.
   */
  const timesForDate = useMemo(() => {
    if (!dateStr) return [];
    if (!doctor?.slots?.length) return ALL_TIMES;

    const avail = doctor.slots       // ["2025-05-02T15:30:00+05:00", …]
      .filter(s => s.startsWith(dateStr))
      .map(s => new Date(s).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false }));
    return avail.length ? avail : [];
  }, [doctor?.slots, dateStr]);

  /* Helpers   ———————————————————————————— */
  const allValid =
    name?.length > 0 &&
    phone?.length > 0 &&
    email?.length > 0 &&
    slotValue instanceof Date && !isNaN(slotValue);

  const selectSlot = (t) => {
    const iso = `${dateStr}T${t}:00+05:00`;           // Asia/Karachi (UTC+5)
    control.setValue('slot', new Date(iso), { shouldValidate: true });
  };

  return (
    <Fragment>
      {/* ───── Header / progress indicator (optional) ───── */}
      <h3 className="mb-6 text-lg font-semibold text-primary">
        2 / 3  Patient Details
      </h3>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Full Name */}
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              placeholder="Full Name"
              className="rounded border p-3 text-sm w-full"
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
              className="rounded border p-3 text-sm w-full"
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
              className="rounded border p-3 text-sm w-full md:col-span-2"
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
            control.setValue('slot', undefined);
          }}
          className="rounded border p-3 text-sm w-full"
        />

        {/* Time-slot buttons */}
        {dateStr && (
          <div className="md:col-span-2">
            <p className="mb-2 text-sm font-medium">Choose 30-min slot:</p>
            <div className="flex flex-wrap gap-2">
              {timesForDate.length === 0 && (
                <span className="text-xs text-gray-500">No slots for this date</span>
              )}
              {timesForDate.map((t) => {
                const active =
                  slotValue instanceof Date &&
                  slotValue.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false }) === t;
                return (
                  <button
                    key={t}
                    onClick={() => selectSlot(t)}
                    className={`rounded-full border px-3 py-1 text-xs
                      ${active ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}
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

      {/* ───── Navigation Buttons ───── */}
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
