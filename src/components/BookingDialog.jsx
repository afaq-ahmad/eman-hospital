import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import {
  useForm,
  FormProvider,     // ⬅️ NEW — provides context to the step components
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { CheckCircle2, X } from 'lucide-react';
import useConsultStore from '@/store/consultationStore';

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
  const { handleSubmit, watch } = methods;

  /* ------------------------------------------------------------
     ② wizard step handling (unchanged)
  ------------------------------------------------------------ */
  const { step, reset: resetStep } = useConsultStore();

  /* ------------------------------------------------------------
     ③ submit handler
  ------------------------------------------------------------ */
  function submit(data) {
    // build multipart body
    const fd = new FormData();
    fd.append('doctorId', doctor.id);
    Object.entries(data).forEach(([k, v]) => fd.append(k, v));
  
    /* ① show a spinner immediately and keep its id ------------- */
    const toastId = toast.loading('Submitting…', { duration: 60000 });
  
    fetch('/api/appointments', { method: 'POST', body: fd })
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();          // whatever your API sends back
      })
      .then(() => {
        /* ② replace the spinner with a green “Booked!” panel ---- */
        toast.success(t => (
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
        ), { id: toastId, duration: 7000 });      // ← same id, so it REPLACES
      })
      .catch(err => {
        /* ③ network / server / validation errors ---------------- */
        console.error(err);
        toast.error('Could not submit – please try again', { id: toastId });
      })
      .finally(() => {
        /* ④ close the dialog AFTER toast swap so it’s visible --- */
        reset();      // zustand → step back to 1
        onClose();    // close the modal
      });
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
                {step === 1 && <PaymentStep doctor={doctor} />}
                {step === 2 && <DetailsStep doctor={doctor} />}
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
