/* PaymentStep.jsx ---------------------------------------------------------
   Handles Step‑2 of the Online‑Consultation wizard
   ‑ Collects payment slip
   ‑ Auto‑advances to the next step once a valid file is present
------------------------------------------------------------------------ */

import { useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { ClipboardCopy, UploadCloud } from 'lucide-react';
import toast from 'react-hot-toast';
import useConsultStore from '@/store/consultationStore';
import { Button } from '@/components/ui/button';

const MAX_SIZE = 5 * 1024 * 1024;                 // 5 MB
const ACCEPTED = '.jpg,.jpeg,.png,.pdf';

export default function PaymentStep({ doctor }) {
  /* grab RHF helpers from context */
  const { control, watch, formState: { errors }, setError, clearErrors } = useFormContext();
  const { next, prev } = useConsultStore(s => ({ next: s.next, prev: s.prev }));

  const slip = watch('slip');                      // watch the file input
  const consultationFee = Number(doctor?.fee) || 0;
  const formattedFee = consultationFee.toLocaleString('en-PK');

  /* ── auto‑advance when a valid slip exists ───────────────────────────*/
  useEffect(() => {
    if (slip && !errors.slip) next();
  }, [slip, errors.slip, next]);

  /* helper to copy a field and show a toast */
  const copy = txt => navigator.clipboard.writeText(txt)
    .then(() => toast.success('Copied to clipboard'));

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-primary">2 / 3  Payment & Challan Upload</h3>
      {/* ⓵  Static payment instructions */}
      <div className="relative rounded-xl bg-gray-50 p-6">
        {/* copy-icons */}
        <button
          onClick={() => copy('000248546742')}
          className="absolute top-3 right-14 p-1 hover:text-primary"
          aria-label="Copy account number"
        >
          <ClipboardCopy size={18} />
        </button>
        <button
          onClick={() => copy('PK84UNIL0109000248546742')}
          className="absolute top-3 right-3 p-1 hover:text-primary"
          aria-label="Copy IBAN"
        >
          <ClipboardCopy size={18} />
        </button>

        <pre className="whitespace-pre-wrap text-sm leading-6 text-gray-700">
{`Pay PKR ${formattedFee} **before** booking

Bank Name:       United Bank Limited
Account Title:   Nasir Abbas
A/C #:           000248546742
IBAN:            PK84UNIL0109000248546742

Upload a clear screenshot/photo of your transfer receipt.`}
        </pre>
      </div>

      {/* ⓶  Slip uploader */}
      <Controller
        name="slip"
        control={control}
        defaultValue={null}
        render={({ field: { onChange } }) => (
          <label className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-8 text-center hover:bg-gray-50">
            <UploadCloud size={32} className="text-gray-500" />
            <span className="text-sm">
              Drag &amp; drop or <span className="font-medium text-primary">browse</span>
            </span>
            <input
              type="file"
              accept={ACCEPTED}
              hidden
              onChange={e => {
                const file = e.target.files[0];
                if (!file) return;              // user cancelled

                /* size guard ------------------------------------------------*/
                if (file.size > MAX_SIZE) {
                  toast.error('Max file size is 5 MB');
                  setError('slip', { type: 'manual', message: 'File exceeds 5 MB' });
                  e.target.value = '';
                  return;
                }

                clearErrors('slip');            // clear previous error (if any)
                onChange(file);                 // store file object in RHF
              }}
            />
            {errors.slip && (
              <p className="mt-2 text-xs text-red-600">{errors.slip.message}</p>
            )}
          </label>
        )}
      />

      {/* ⓷  Manual “Next” fallback (disabled until valid) */}
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={prev}>
          Back
        </Button>
        <Button type="button" onClick={next} disabled={!slip || !!errors.slip}
          className="disabled:opacity-40">
          Next
        </Button>
      </div>
    </div>
  );
}
