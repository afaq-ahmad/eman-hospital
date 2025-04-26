import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import useConsultStore from '@/store/consultationStore';
import PaymentStep from './booking/PaymentStep';
import DetailsStep from './booking/DetailsStep';
import ReviewStep from './booking/ReviewStep';

const schema = yup.object({
  slip: yup.mixed().required(),
  name: yup.string().required(),
  phone: yup.string().required(),
  email: yup.string().email().required(),
  slot: yup.date().required(),
});

export default function BookingDialog({ doctor, open, onClose }) {
  const { step, next, prev, reset } = useConsultStore();

  const { control, handleSubmit, watch, formState:{isValid} } =
    useForm({ resolver: yupResolver(schema), mode:'onChange' });

  function submit(data) {
    const fd = new FormData();
    fd.append('doctorId', doctor.id);
    Object.entries(data).forEach(([k,v]) => fd.append(k,v));
    fetch('/api/appointments',{ method:'POST', body:fd })
      .then(r => r.ok ? toast.success('Request submitted') : toast.error('Error'))
      .finally(() => { reset(); onClose(); });
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog onClose={() => { reset(); onClose(); }} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
          leave="ease-in duration-200"  leaveFrom="opacity-100" leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300" enterFrom="translate-y-8 opacity-0" enterTo="translate-y-0 opacity-100"
            leave="ease-in duration-200"  leaveFrom="translate-y-0 opacity-100" leaveTo="translate-y-8 opacity-0"
          >
            <Dialog.Panel className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
              {step === 1 && <PaymentStep control={control} />}
              {step === 2 && <DetailsStep control={control} doctor={doctor} />}
              {step === 3 && (
                <ReviewStep
                  values={watch()}
                  doctor={doctor}
                  isValid={isValid}
                  onSubmit={handleSubmit(submit)}
                />
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
