import { useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { ClipboardCopy, UploadCloud } from 'lucide-react';
import toast from 'react-hot-toast';
import useConsultStore from '@/store/consultationStore';
import { Button } from '@/components/ui/button';

const MAX_SIZE = 5 * 1024 * 1024;
const ACCEPTED = '.jpg,.jpeg,.png,.pdf';

export default function PaymentStep({ doctor, onStepComplete }) {
  const { control, watch, formState: { errors }, setError, clearErrors } = useFormContext();
  const { next, prev } = useConsultStore((s) => ({ next: s.next, prev: s.prev }));

  const slip = watch('slip');
  const consultationFee = Number(doctor?.fee) || 0;
  const formattedFee = consultationFee.toLocaleString('en-PK');

  useEffect(() => {
    if (slip && !errors.slip) {
      onStepComplete?.();
      next();
    }
  }, [slip, errors.slip, next, onStepComplete]);

  const copy = (txt) => navigator.clipboard.writeText(txt).then(() => toast.success('Copied to clipboard'));

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">2 / 3 Payment & Receipt Upload</h3>
          <span className="text-xs font-semibold text-slate-500">Step 2 of 3</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full w-2/3 rounded-full bg-primary" />
        </div>
      </div>

      <div className="relative rounded-xl border border-slate-200 bg-slate-50 p-6">
        <button
          onClick={() => copy('000248546742')}
          className="absolute right-14 top-3 p-1 hover:text-primary"
          aria-label="Copy bank account number"
        >
          <ClipboardCopy size={18} />
        </button>
        <button
          onClick={() => copy('03006307206')}
          className="absolute right-3 top-3 p-1 hover:text-primary"
          aria-label="Copy Easypaisa account number"
        >
          <ClipboardCopy size={18} />
        </button>

        <pre className="whitespace-pre-wrap text-sm leading-6 text-gray-700">
{`Pay PKR ${formattedFee} before booking confirmation.

BANK ACCOUNT (same as current):
Bank Name:       United Bank Limited
Account Title:   Nasir Abbas
A/C #:           000248546742
IBAN:            PK84UNIL0109000248546742

EASYPAISA ACCOUNT:
Account Name:    Nasir Abbas
ACC:             03006307206

Service Charges: Rs. 0
Session Type:    Online session via WhatsApp call (No Zoom)

Upload a clear screenshot/photo of your payment receipt.`}
        </pre>
      </div>

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
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;

                if (file.size > MAX_SIZE) {
                  toast.error('Max file size is 5 MB');
                  setError('slip', { type: 'manual', message: 'File exceeds 5 MB' });
                  e.target.value = '';
                  return;
                }

                clearErrors('slip');
                onChange(file);
              }}
            />
            {errors.slip && <p className="mt-2 text-xs text-red-600">{errors.slip.message}</p>}
          </label>
        )}
      />

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={prev}>
          Back
        </Button>
        <Button
          type="button"
          onClick={() => {
            onStepComplete?.();
            next();
          }}
          disabled={!slip || !!errors.slip}
          className="disabled:opacity-40"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
