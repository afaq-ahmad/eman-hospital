// ────────────────────────────────────────────────────────────────
//  DetailsStep.jsx   —   2 of 3 in the multi-step BookingDialog
//  Collects patient information + preferred slot (with clash-safety)
// ────────────────────────────────────────────────────────────────
import { Fragment, useMemo, useState } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import useConsultStore from '@/store/consultationStore';
import {
  getMaxDateString,
  getSlotsForDoctorDate,
  getTodayDateString,
} from '@/utils/doctorAvailability';

export default function DetailsStep({ control: ctlProp, doctor }) {
  // Support both “passed-in control” and context-based access
  const { control, setValue } = useFormContext();

  const { next, prev } = useConsultStore();

  /* ─────── watched form values ─────────────────────────────── */
  const name = useWatch({ control, name: 'name' });
  const phone = useWatch({ control, name: 'phone' });
  const email = useWatch({ control, name: 'email' });
  const slotValue = useWatch({ control, name: 'slot' }); // Date - or undefined

  /* ─────── local state ─────────────────────────────────────── */
  const [dateStr, setDateStr] = useState(''); // YYYY-MM-DD
  const minDate = getTodayDateString();
  const maxDate = getMaxDateString();

  /* ─────── compute doctor availability for selected date ───── */
  const scheduleSlots = useMemo(() => {
    if (!dateStr) return [];
    return getSlotsForDoctorDate(doctor?.key, dateStr);
  }, [doctor?.key, dateStr]);

  const freeSlots = useMemo(() => {
    if (!dateStr) return [];

    // If the API did not yet deliver the array, assume schedule slots are free
    if (!doctor?.booked?.length) return scheduleSlots;

    // booked for that particular date → ["15:30", …]
    const bookedToday = doctor.booked
      .filter((iso) => iso.startsWith(dateStr))
      .map((iso) =>
        new Date(iso).toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
      );

    return scheduleSlots.filter((t) => !bookedToday.includes(t));
  }, [doctor?.booked, dateStr, scheduleSlots]);

  /* ─────── helpers ─────────────────────────────────────────── */
  const isPastSlot = (t) => {
    const when = new Date(`${dateStr}T${t}:00`);
    return when < new Date();
  };

  const selectSlot = (t) => {
    const when = new Date(`${dateStr}T${t}:00`);

    if (when < new Date()) return; // guard against past-date pick

    setValue('slot', when, { shouldValidate: true });
  };

  const allValid =
    name?.length > 0 &&
    phone?.length > 0 &&
    email?.length > 0 &&
    slotValue instanceof Date &&
    !isNaN(slotValue) &&
    slotValue > new Date();

  /* ─────── render ──────────────────────────────────────────── */
  return (
    <Fragment>
      <h3 className="mb-6 text-lg font-semibold text-primary">2 / 3  Patient Details</h3>

      <div className="grid gap-4 md:grid-cols-2">
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

        <input
          type="date"
          value={dateStr}
          min={minDate}
          max={maxDate}
          onChange={(e) => {
            setDateStr(e.target.value);
            setValue('slot', undefined, { shouldValidate: true });
          }}
          className="w-full rounded border p-3 text-sm"
        />

        {dateStr && (
          <div className="md:col-span-2">
            <p className="mb-2 text-sm font-medium">Choose doctor slot:</p>

            {scheduleSlots.length === 0 ? (
              <p className="text-sm text-gray-500">
                Doctor is unavailable on the selected day. Please choose another date.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {scheduleSlots.map((t) => {
                  const taken = !freeSlots.includes(t);
                  const inPast = isPastSlot(t);
                  const disabled = taken || inPast;
                  const active =
                    slotValue instanceof Date &&
                    new Intl.DateTimeFormat('en-GB', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                    }).format(slotValue) === t;

                  return (
                    <button
                      key={t}
                      disabled={disabled}
                      onClick={() => !disabled && selectSlot(t)}
                      className={`rounded-full border px-3 py-1 text-xs transition
                      ${
                        active
                          ? 'bg-primary text-white'
                          : disabled
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }
                    `}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

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
