import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import {
  useForm,
  FormProvider,     // ⬅️ NEW — provides context to the step components
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { CheckCircle2 } from 'lucide-react';
import useConsultStore from '@/store/consultationStore';
import { fileToBase64 } from '@/utils/fileToBase64';
import { formatPakistanDateTime, toPakistanIsoString } from '@/utils/pakistanTime';

import PaymentStep   from './booking/PaymentStep';
import DetailsStep   from './booking/DetailsStep';
import ReviewStep    from './booking/ReviewStep';
import { bookingSchema } from './booking/validationSchema';

export default function BookingDialog({ doctor, open, onClose }) {
  /* ------------------------------------------------------------
     ① create a single react-hook-form instance (“methods”)
        and expose it through <FormProvider …>
  ------------------------------------------------------------ */
  const methods = useForm({
    resolver: yupResolver(bookingSchema),
    mode: 'onChange',
  });
  const { handleSubmit } = methods;

  /* ------------------------------------------------------------
     ② wizard step handling (unchanged)
  ------------------------------------------------------------ */
  const { step, reset: resetStep } = useConsultStore();

  /* ------------------------------------------------------------
     ③ submit handler
  ------------------------------------------------------------ */
  async function submit(data) {
    /* ① show a spinner immediately and keep its id ------------- */
    const toastId = toast.loading('Submitting…', { duration: 60000 });

    try {
      const webhookUrl = import.meta.env.VITE_BOOKING_WEBHOOK_URL;
      const webhookToken = import.meta.env.VITE_BOOKING_WEBHOOK_TOKEN;

      const slotDate = data.slot instanceof Date ? data.slot : new Date(data.slot);
      const submittedAt = new Date();

      const payload = {
        doctorId: doctor.id || doctor.key || doctor.name,
        doctorName: doctor.name,
        patientName: data.name,
        phone: data.phone,
        email: data.email,
        // Keep primary timestamps in Pakistan time so Google Apps Script receives PKT directly.
        slot: toPakistanIsoString(slotDate),
        slotPakistan: toPakistanIsoString(slotDate),
        slotUtc: slotDate.toISOString(),
        slotDisplayPakistan: formatPakistanDateTime(slotDate),
        submittedAt: toPakistanIsoString(submittedAt),
        submittedAtPakistan: toPakistanIsoString(submittedAt),
        submittedAtUtc: submittedAt.toISOString(),
        fileName: data.slip?.name,
        fileType: data.slip?.type,
        fileBase64: await fileToBase64(data.slip),
      };

      const requestViaProxy = async () =>
        fetch('/api/booking', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

      const requestDirect = async () => {
        if (!webhookUrl || !webhookToken) {
          throw new Error('Missing booking webhook configuration');
        }

        return fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: JSON.stringify({ ...payload, token: webhookToken }),
        });
      };

      let response = await requestViaProxy();
      let raw = await response.text();
      let result = null;
      try {
        result = raw ? JSON.parse(raw) : null;
      } catch {
        result = null;
      }

      // local/dev fallback when Cloudflare Pages Functions are unavailable
      if (!response.ok && (response.status === 404 || result?.error === 'missing_server_config')) {
        response = await requestDirect();
        raw = await response.text();
        try {
          result = raw ? JSON.parse(raw) : null;
        } catch {
          result = null;
        }
      }

      if (!response.ok) {
        const missing = result?.missing?.length ? `: ${result.missing.join(', ')}` : '';
        throw new Error(`${result?.error || raw || `HTTP ${response.status}`}${missing}`);
      }

      if (!result?.ok) {
        const missing = result?.missing?.length ? `: ${result.missing.join(', ')}` : '';
        throw new Error(`${result?.error || result?.message || raw || 'Webhook error'}${missing}`);
      }

      /* ② replace the spinner with a green “Booked!” panel ---- */
      toast.success(() => (
        <div
          className="flex items-start gap-3 rounded-lg border border-green-400
                     bg-green-50 p-4 text-green-800 shadow-lg"
        >
          <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-green-600" />
          <p className="text-sm leading-5">
            Request sent! We’ll WhatsApp you as soon as&nbsp;
            {doctor.name.split(' ')[0]} confirms the slot.
          </p>
        </div>
      ), { id: toastId, duration: 7000 });

      /* ④ close the dialog AFTER toast swap so it’s visible --- */
      resetStep();
      methods.reset();
      onClose();
    } catch (err) {
      /* ③ network / server / validation errors ---------------- */
      console.error('Booking submission failed', err);
      const message = err instanceof Error ? err.message : 'Could not submit – please try again';
      toast.error(`Could not submit: ${message}`, { id: toastId });
    }
  }

  /* ------------------------------------------------------------
     ④ UI
  ------------------------------------------------------------ */
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        onClose={() => {
          resetStep();
          methods.reset();
          onClose();
        }}
        className="relative z-50"
      >
        {/* dark overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        {/* centered panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="translate-y-8 opacity-0"
            enterTo="translate-y-0 opacity-100"
            leave="ease-in duration-200"
            leaveFrom="translate-y-0 opacity-100"
            leaveTo="translate-y-8 opacity-0"
          >
            {/* keep Dialog.Panel first (so it receives the ref)! */}
            <Dialog.Panel className="w-full max-w-lg sm:max-h-[90vh] overflow-hidden rounded-2xl bg-white p-6 shadow-xl">
              <FormProvider {...methods}>
                {step === 1 && <DetailsStep doctor={doctor} />}
                {step === 2 && <PaymentStep doctor={doctor} />}
                {step === 3 && (
            <ReviewStep
              doctor={doctor}
              onSubmit={handleSubmit(submit)}
              />
          )}
              </FormProvider>
              </Dialog.Panel>
            </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
