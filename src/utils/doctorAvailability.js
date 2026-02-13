import availabilityConfig from '@/data/doctorAvailability.json';

export const BOOKING_WINDOW_DAYS = availabilityConfig.bookingWindowDays ?? 14;
const SLOT_MINUTES = availabilityConfig.slotMinutes ?? 30;

const WEEK_DAYS = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];

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
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function getMaxDateString() {
  const d = new Date();
  d.setDate(d.getDate() + BOOKING_WINDOW_DAYS - 1);

  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function getSlotsForDoctorDate(doctorKey, dateStr) {
  const dayName = WEEK_DAYS[new Date(`${dateStr}T00:00:00`).getDay()];

  const doctorSchedule = availabilityConfig.doctors?.[doctorKey]?.weeklySchedule;
  const fallbackSchedule = availabilityConfig.defaultWeeklySchedule ?? {};

  const ranges =
    doctorSchedule?.[dayName] ??
    fallbackSchedule?.[dayName] ??
    [];

  return buildSlotsFromRanges(ranges);
}
