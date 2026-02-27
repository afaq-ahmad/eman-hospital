import { Button } from '@/components/ui/button';
import useConsultStore from '@/store/consultationStore';
import { useFormContext, useWatch } from 'react-hook-form';
import { useMemo } from 'react';
import { formatPakistanDateTime } from '@/utils/pakistanTime';

export default function ReviewStep({ doctor, onSubmit }) {
  const prev = useConsultStore((s) => s.prev);
  const {
    control,
    formState: { isSubmitting },
  } = useFormContext();
  const { slip, name, phone, email, slot } = useWatch({ control });

  const slotStr = useMemo(() => {
    if (!slot) return '';
    const slotDate = slot instanceof Date ? slot : new Date(slot);
    if (isNaN(slotDate)) return '';
    return `${formatPakistanDateTime(slotDate)} PKT`;
  }, [slot]);

  const consultationFee = Number(doctor?.fee) || 0;
  const formattedFee = consultationFee.toLocaleString('en-PK');

  return (
    <form onSubmit={onSubmit} className="flex h-full flex-col">
      <div className="flex-1 space-y-5 overflow-y-auto pr-[2px]">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">3 / 3 Review & Confirm</h3>
            <span className="text-xs font-semibold text-slate-500">Step 3 of 3</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-full rounded-full bg-primary" />
          </div>
        </div>

        <div className="rounded-xl border p-6 text-sm leading-6">
          <h4 className="mb-4 text-base font-semibold text-primary">Please confirm the details</h4>
          <dl className="grid grid-cols-2 gap-y-2">
            <dt className="text-gray-500">Doctor</dt><dd>{doctor?.name}</dd>
            <dt className="text-gray-500">Session Type</dt><dd>Online WhatsApp Call</dd>
            <dt className="text-gray-500">Slot</dt><dd>{slotStr}</dd>
            <dt className="text-gray-500">Name</dt><dd>{name}</dd>
            <dt className="text-gray-500">Phone</dt><dd>{phone}</dd>
            <dt className="text-gray-500">Email</dt><dd>{email}</dd>
            <dt className="text-gray-500">Consultation Fee</dt><dd>Rs. {formattedFee}</dd>
            <dt className="text-gray-500">Service Charges</dt><dd>Rs. 0</dd>
            <dt className="text-gray-500">Slip</dt>
            <dd>
              {slip?.name}
              {slip?.type.startsWith('image/') && (
                <>
                  <br />
                  <img
                    src={URL.createObjectURL(slip)}
                    alt="Payment slip preview"
                    className="mt-2 max-h-40 rounded border"
                    onLoad={(e) => URL.revokeObjectURL(e.target.src)}
                  />
                </>
              )}
            </dd>
          </dl>
        </div>
      </div>

      <div className="mt-6 flex shrink-0 justify-between border-t pt-4">
        <Button variant="outline" type="button" onClick={prev}>
          Back
        </Button>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#00bfa6] text-white hover:bg-[#00bfa6]/90 disabled:opacity-40"
        >
          {isSubmitting ? 'Submitting…' : 'Submit'}
        </Button>
      </div>
    </form>
  );
}
