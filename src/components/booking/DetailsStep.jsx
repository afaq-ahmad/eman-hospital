import { Fragment, useMemo, useState } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import useConsultStore from '@/store/consultationStore';
import {
  getMaxDateString,
  getSlotsForDoctorDate,
  getTodayDateString,
} from '@/utils/doctorAvailability';
import {
  getPakistanDateString,
  getPakistanTimeString,
  pakistanDateTimeToUtcDate,
  PAKISTAN_TIMEZONE,
} from '@/utils/pakistanTime';
import { trackEvent } from '@/utils/analytics';

export default function DetailsStep({ doctor }) {
  const {
    control,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext();

  const { next, prev } = useConsultStore();

  const name = useWatch({ control, name: 'name' });
  const phone = useWatch({ control, name: 'phone' });
  const email = useWatch({ control, name: 'email' });
  const slotValue = useWatch({ control, name: 'slot' });

  const [dateStr, setDateStr] = useState('');
  const minDate = getTodayDateString();
  const maxDate = getMaxDateString();

  const scheduleSlots = useMemo(() => {
    if (!dateStr) return [];
    return getSlotsForDoctorDate(doctor?.key, dateStr);
  }, [doctor?.key, dateStr]);

  const freeSlots = useMemo(() => {
    if (!dateStr) return [];

    if (!doctor?.booked?.length) return scheduleSlots;

    const bookedToday = doctor.booked
      .filter((iso) => getPakistanDateString(new Date(iso)) === dateStr)
      .map((iso) => getPakistanTimeString(new Date(iso)));

    return scheduleSlots.filter((t) => !bookedToday.includes(t));
  }, [doctor?.booked, dateStr, scheduleSlots]);

  const isPastSlot = (t) => pakistanDateTimeToUtcDate(dateStr, t) < new Date();

  const selectSlot = (t) => {
    const when = pakistanDateTimeToUtcDate(dateStr, t);
    if (when < new Date()) return;
    setValue('slot', when, { shouldValidate: true });
  };

  const allValid =
    name?.length > 0 &&
    phone?.length > 0 &&
    email?.length > 0 &&
    slotValue instanceof Date &&
    !isNaN(slotValue) &&
    slotValue > new Date();

  const onContinue = async () => {
    const valid = await trigger(['name', 'phone', 'email', 'slot']);

    if (valid) {
      trackEvent('book_step_complete', {
        step_number: 1,
        step_name: 'patient_details',
        doctor_id: doctor?.id || doctor?.key || doctor?.name,
        doctor_name: doctor?.name,
      });
      next();
    }
  };

  const consultationFee = Number(doctor?.fee) || 0;
  const formattedFee = consultationFee.toLocaleString('en-PK');
  const totalPayable = consultationFee.toLocaleString('en-PK');

  return (
    <Fragment>
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-5">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-base font-semibold text-slate-900">Patient Details</p>
              <p className="text-sm font-medium text-slate-500">Step 1 of 3</p>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-1/3 rounded-full bg-primary" />
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
            <h3 className="text-2xl font-bold text-slate-900">Book Online Consultation</h3>
            <p className="mt-1 text-sm text-slate-500">
              Fill in your details to schedule your online consultation session.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-slate-800">Patient Full Name</span>
                    <input
                      {...field}
                      placeholder="Enter patient's name"
                      className="w-full rounded-lg border border-slate-200 p-3 text-sm"
                    />
                    {errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}
                  </label>
                )}
              />

              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-slate-800">Mobile Number</span>
                    <input
                      {...field}
                      placeholder="0300-1234567"
                      className="w-full rounded-lg border border-slate-200 p-3 text-sm"
                    />
                    {errors.phone && <p className="text-xs text-red-600">{errors.phone.message}</p>}
                  </label>
                )}
              />

              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <label className="space-y-2 md:col-span-2">
                    <span className="text-sm font-semibold text-slate-800">Email Address</span>
                    <input
                      {...field}
                      type="email"
                      placeholder="you@email.com"
                      className="w-full rounded-lg border border-slate-200 p-3 text-sm"
                    />
                    {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
                  </label>
                )}
              />
            </div>

            <div className="mt-6 space-y-3">
              <h4 className="text-lg font-bold text-slate-900">Select Date & Time</h4>
              <input
                type="date"
                value={dateStr}
                min={minDate}
                max={maxDate}
                onChange={(e) => {
                  setDateStr(e.target.value);
                  setValue('slot', undefined, { shouldValidate: true });
                }}
                className="w-full rounded-lg border border-slate-200 p-3 text-sm"
              />

              {dateStr && (
                <div>
                  {scheduleSlots.length === 0 ? (
                    <p className="text-sm text-gray-500">
                      Doctor is unavailable on the selected day. Please choose another date.
                    </p>
                  ) : (
                    <div className="mt-3 flex flex-wrap gap-2">
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
                            timeZone: PAKISTAN_TIMEZONE,
                          }).format(slotValue) === t;

                        return (
                          <button
                            type="button"
                            key={t}
                            disabled={disabled}
                            onClick={() => !disabled && selectSlot(t)}
                            className={`rounded-full border px-3 py-1 text-xs transition ${
                              active
                                ? 'border-primary bg-primary text-white'
                                : disabled
                                ? 'cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400'
                                : 'border-slate-200 bg-white text-slate-700 hover:border-primary'
                            }`}
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  )}
                  {errors.slot && <p className="mt-2 text-xs text-red-600">{errors.slot.message}</p>}
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-between border-t border-slate-100 pt-4">
              <Button variant="outline" onClick={prev} disabled>
                Back
              </Button>
              <Button type="button" disabled={!allValid} onClick={onContinue}>
                Next Step
              </Button>
            </div>
          </div>
        </div>

        <aside className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Booking Summary</h4>
          <div className="flex items-start gap-3">
            <img
              className="h-14 w-14 rounded-full border-2 border-primary/20 object-cover"
              src={doctor?.img}
              alt={doctor?.name}
            />
            <div>
              <p className="font-bold text-slate-900">{doctor?.name}</p>
              <p className="text-sm font-medium text-primary">{doctor?.title}</p>
              <p className="mt-1 text-xs text-slate-500">⭐ 4.9 (187+ Reviews)</p>
            </div>
          </div>

          <div className="space-y-2 border-t border-slate-100 pt-3 text-sm">
            <p className="flex justify-between"><span className="text-slate-500">Consultation Type</span><span className="font-semibold text-slate-900">WhatsApp Call</span></p>
            <p className="flex justify-between"><span className="text-slate-500">Service Charges</span><span className="font-semibold text-emerald-600">Rs. 0</span></p>
          </div>

          <div className="rounded-lg bg-slate-50 p-4">
            <p className="flex justify-between text-sm"><span className="text-slate-600">Consultation Fee</span><span className="font-semibold text-slate-900">Rs. {formattedFee}</span></p>
            <div className="my-3 border-t border-slate-200" />
            <p className="flex justify-between"><span className="font-bold text-slate-900">Total Payable</span><span className="text-lg font-bold text-primary">Rs. {totalPayable}</span></p>
          </div>
        </aside>
      </div>
    </Fragment>
  );
}
