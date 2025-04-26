// src/components/booking/validationSchema.js
import * as yup from 'yup';

const MAX_SIZE = 5 * 1024 * 1024;                // 5 MB
const FILE_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

export const bookingSchema = yup.object({
  /* step-1  payment-slip ---------------------------------------- */
  slip: yup
    .mixed()
    .required('Payment slip is required')
    .test('fileSize', 'File must be ≤ 5 MB', v => !v || v.size <= MAX_SIZE)
    .test('fileType', 'Only JPG / PNG / PDF allowed', v => !v || FILE_TYPES.includes(v.type)),

  /* step-2  patient details ------------------------------------- */
  name:  yup.string().min(3).required('Enter full name'),
  phone: yup
    .string()
    .required('Phone is required')
    // 03xx-xxxxxxx  or  +92xxxxxxxxxxx
    .matches(/^(03\d{2}[- ]?\d{7}|(\+92)?3\d{9})$/, 'Invalid PK mobile number'),
  email: yup.string().email('Invalid email').required(),

  slot: yup
    .date()
    .typeError('Pick a slot')
    .required(),
});
