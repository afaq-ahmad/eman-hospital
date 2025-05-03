import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import {
  useForm,
  FormProvider,     // ⬅️ NEW — provides context to the step components
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
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
      .then((r) =>
        r.ok
          ? toast.success('Request submitted')
          : toast.error('Something went wrong')
      )
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
            {/* 🟢 all children can now call useFormContext() */}
            <FormProvider {...methods}>
              <Dialog.Panel className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
                {step === 1 && <PaymentStep />}
                {step === 2 && <DetailsStep doctor={doctor} />}
                {step === 3 && (
                  <ReviewStep
                    doctor={doctor}
                    onSubmit={handleSubmit(submit)}
                  />
                )}
              </Dialog.Panel>
            </FormProvider>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
