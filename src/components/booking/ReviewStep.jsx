// src/components/booking/ReviewStep.jsx
import { Button } from '@/components/ui/button';
import useConsultStore from '@/store/consultationStore';
import { useFormContext } from 'react-hook-form';

export default function ReviewStep({ doctor, onSubmit }) {
  const prev = useConsultStore(s => s.prev);
  const { formState:{ isValid } } = useFormContext();

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* …summary of entered data… */}

      <div className="flex justify-between">
        <Button variant="outline" type="button" onClick={prev}>Back</Button>

        <Button
          type="submit"
          disabled={!isValid}          // ←-- the magic line
          className="bg-[#00bfa6] text-white hover:bg-[#00bfa6]/90 disabled:opacity-40"
        >
          Submit
        </Button>
      </div>
    </form>
  );
}
