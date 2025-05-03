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
    const fd = new FormData();
    fd.append('doctorId', doctor.id);
    Object.entries(data).forEach(([k, v]) => fd.append(k, v));

    fetch('/api/appointments', { method: 'POST', body: fd })
      .then(r => {
        if (!r.ok) {
          toast.error('Something went wrong — please try again');
          return;
        }
        toast.custom(t => (
          <div
            className="pointer-events-auto flex w-full max-w-sm items-start gap-3
                       rounded-lg border border-green-400 bg-green-50 p-4 shadow-lg"
          >
            <CheckCircle2 size={20} className="mt-1 shrink-0 text-green-600" />
      
            <div className="grow text-sm leading-5 text-green-800">
              <p className="font-semibold">Request sent!</p>
              <p className="mt-0.5">
                We’ll message you on WhatsApp as soon as&nbsp;
                {doctor.name.split(' ')[0]} confirms the slot.
              </p>
            </div>
      
            <button
              onClick={() => toast.dismiss(t.id)}
              className="shrink-0 rounded p-1 hover:bg-green-100"
              aria-label="Dismiss"
            >
              <X size={18} className="text-green-700" />
            </button>
          </div>
        ));
      
      })
      .finally(() => {
        resetStep();       // reset Zustand step counter
        methods.reset();   // reset form fields 👍
        onClose();         // close dialog
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
                {step === 1 && <PaymentStep />}
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
