// src/components/booking/ReviewStep.jsx
import { Button } from '@/components/ui/button';
import useConsultStore from '@/store/consultationStore';
import { useFormContext, useWatch } from 'react-hook-form';
import { useEffect, useState } from 'react';

export default function ReviewStep({ doctor, onSubmit }) {
  const prev = useConsultStore(s => s.prev);
  const { control, formState:{ isValid } } = useFormContext();
  const { slip, name, phone, email, slot } = useWatch({ control });

  /* prettify the appointment slot */
  const [slotStr, setSlotStr] = useState('');
  useEffect(() => {
    if (slot instanceof Date && !isNaN(slot)) {
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
    }
  }, [slot]);

  return (
    /* flex column → summary (scrolls) + sticky button bar */
    <form onSubmit={onSubmit} className="flex h-full flex-col">
      {/* ───── review summary ───── */}
      <div className="flex-1 overflow-y-auto space-y-6 pr-[2px]">
        <div className="rounded-xl border p-6 text-sm leading-6">
          <h4 className="mb-4 text-base font-semibold text-primary">
            Please confirm the details
          </h4>

          {/* vanilla two-column grid – no arbitrary values */}
          <dl className="grid grid-cols-2 gap-y-2">
            <dt className="text-gray-500">Doctor</dt><dd>{doctor?.name}</dd>
            <dt className="text-gray-500">Slot</dt>  <dd>{slotStr}</dd>
            <dt className="text-gray-500">Name</dt>  <dd>{name}</dd>
            <dt className="text-gray-500">Phone</dt> <dd>{phone}</dd>
            <dt className="text-gray-500">Email</dt> <dd>{email}</dd>
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
                    onLoad={e => URL.revokeObjectURL(e.target.src)}
                  />
                </>
              )}
            </dd>
          </dl>
        </div>
      </div>

      {/* ───── button bar (never scrolls out of view) ───── */}
      <div className="mt-6 flex shrink-0 justify-between border-t pt-4">
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
