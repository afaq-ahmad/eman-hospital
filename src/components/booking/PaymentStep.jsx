/* PaymentStep.jsx --------------------------------------------------------- */
import { Controller } from 'react-hook-form';
import { ClipboardCopy, UploadCloud } from 'lucide-react';
import toast from 'react-hot-toast';
import useConsultStore from '@/store/consultationStore';
import { Button } from '@/components/ui/button';

export default function PaymentStep({ control }) {
  const next = useConsultStore(s => s.next);

  /* helper to copy a field and show a toast */
  function copy(text) {
    navigator.clipboard.writeText(text).then(() =>
      toast.success('Copied to clipboard')
    );
  }

  return (
    <div className="space-y-6">
      {/* ❶  Static instructions */}
      <div className="relative rounded-xl bg-gray-50 p-6">
        {/* copy-icons (Account & IBAN) */}
        <button
          onClick={() => copy('0123-0123456789')}
          className="absolute top-3 right-14 p-1 hover:text-primary"
          aria-label="Copy account number"
        >
          <ClipboardCopy size={18} />
        </button>
        <button
          onClick={() => copy('PK24 MEZN 0000 1234 5678 9012')}
          className="absolute top-3 right-3 p-1 hover:text-primary"
          aria-label="Copy IBAN"
        >
          <ClipboardCopy size={18} />
        </button>

        {/* keep layout with <pre> so the line-breaks stay intact */}
        <pre className="whitespace-pre-wrap text-sm leading-6 text-gray-700">
{`Pay PKR 2 000 **before** booking

Bank Name:       Meezan Bank
Account Title:   Eman Hospital
A/C #:           0123-0123456789
IBAN:            PK24 MEZN 0000 1234 5678 9012
Branch Code:     0123

Upload a clear screenshot/photo of your transfer receipt.`}
        </pre>
      </div>

      {/* ❷  Slip uploader */}
      <Controller
        name="slip"
        control={control}
        defaultValue={null}
        render={({ field: { onChange }, formState: { errors } }) => (
          <label className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-8 text-center hover:bg-gray-50">
            <UploadCloud size={32} className="text-gray-500" />
            <span className="text-sm">
              Drag &amp; drop or <span className="font-medium text-primary">browse</span>
            </span>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              hidden
              onChange={e => {
                const file = e.target.files[0];
                if (file?.size > 5 * 1024 * 1024) {
                  toast.error('Max file size is 5 MB');
                  e.target.value = '';
                  return;
                }
                onChange(file);
              }}
            />
            {errors.slip && (
              <p className="mt-2 text-xs text-red-600">Receipt is required</p>
            )}
          </label>
        )}
      />

      {/* ❸  Next button */}
      <div className="flex justify-end">
        <Button type="button" onClick={next}>
          Next
        </Button>
      </div>
    </div>
  );
}
