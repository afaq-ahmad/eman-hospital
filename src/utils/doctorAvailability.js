import availabilityConfig from '@/data/doctorAvailability.json';
import { getPakistanDateString, getPakistanDayName } from '@/utils/pakistanTime';

export const BOOKING_WINDOW_DAYS = availabilityConfig.bookingWindowDays ?? 14;
const SLOT_MINUTES = availabilityConfig.slotMinutes ?? 30;

function toMinutes(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

function fromMinutes(minutes) {
  const h = String(Math.floor(minutes / 60)).padStart(2, '0');
  const m = String(minutes % 60).padStart(2, '0');
  return `${h}:${m}`;
}

function buildSlotsFromRanges(ranges) {
  const slots = [];

  ranges.forEach(([start, end]) => {
    const startMinutes = toMinutes(start);
    const endMinutes = toMinutes(end);

    for (let current = startMinutes; current < endMinutes; current += SLOT_MINUTES) {
      slots.push(fromMinutes(current));
    }
  });

  return [...new Set(slots)].sort();
}

export function getTodayDateString() {
  return getPakistanDateString();
}

export function getMaxDateString() {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() + BOOKING_WINDOW_DAYS - 1);
  return getPakistanDateString(d);
}

export function getSlotsForDoctorDate(doctorKey, dateStr) {
  const dayName = getPakistanDayName(dateStr);

  const doctorSchedule = availabilityConfig.doctors?.[doctorKey]?.weeklySchedule;
  const fallbackSchedule = availabilityConfig.defaultWeeklySchedule ?? {};

  const ranges =
    doctorSchedule?.[dayName] ??
    fallbackSchedule?.[dayName] ??
    [];

  return buildSlotsFromRanges(ranges);
}
