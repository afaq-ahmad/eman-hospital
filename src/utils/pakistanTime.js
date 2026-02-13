export const PAKISTAN_TIMEZONE = 'Asia/Karachi';
const PK_UTC_OFFSET_MINUTES = 5 * 60;

function pad(num) {
  return String(num).padStart(2, '0');
}

export function getDatePartsInPakistan(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: PAKISTAN_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);

  const map = Object.fromEntries(parts.map(({ type, value }) => [type, value]));

  return {
    year: Number(map.year),
    month: Number(map.month),
    day: Number(map.day),
  };
}

export function getPakistanDateString(date = new Date()) {
  const { year, month, day } = getDatePartsInPakistan(date);
  return `${year}-${pad(month)}-${pad(day)}`;
}

export function getPakistanDayName(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number);

  return new Intl.DateTimeFormat('en-US', {
    timeZone: PAKISTAN_TIMEZONE,
    weekday: 'long',
  })
    .format(new Date(Date.UTC(year, month - 1, day, 12)))
    .toLowerCase();
}

export function pakistanDateTimeToUtcDate(dateStr, timeStr) {
  const [year, month, day] = dateStr.split('-').map(Number);
  const [hours, minutes] = timeStr.split(':').map(Number);
  const utcMillis = Date.UTC(year, month - 1, day, hours, minutes) - PK_UTC_OFFSET_MINUTES * 60 * 1000;
  return new Date(utcMillis);
}

export function getPakistanTimeString(date) {
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: PAKISTAN_TIMEZONE,
  }).format(date);
}


export function toPakistanIsoString(date) {
  const { year, month, day } = getDatePartsInPakistan(date);
  const time = getPakistanTimeString(date);
  return `${year}-${pad(month)}-${pad(day)}T${time}:00+05:00`;
}

export function formatPakistanDateTime(date) {
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: PAKISTAN_TIMEZONE,
  }).format(date);
}
