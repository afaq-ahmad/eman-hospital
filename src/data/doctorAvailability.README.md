# Doctor Availability Config Guide

Edit **only** `src/data/doctorAvailability.json` to update online consultation slot timings.

## File format

- `bookingWindowDays`: how many days from today can be booked (currently `14`).
- `slotMinutes`: slot size in minutes (currently `30`).
- `defaultWeeklySchedule`: fallback timings used when a doctor has no custom time for a day.
- `doctors.<doctorKey>.weeklySchedule`: custom schedule for a doctor.

## Time range format

Each range is `[
  "HH:MM", "HH:MM"
]`, 24-hour format.

Example:

```json
"monday": [["09:00", "12:00"], ["18:00", "20:00"]]
```

This creates slots every 30 minutes from 9 AM–12 PM and 6 PM–8 PM.

## Important

- To close a day, set it to `[]`.
- You can add multiple ranges in one day.
- Use each doctor's `key` from `src/App.jsx` as `doctorKey` (e.g., `ehsan`, `sarfaraz`).
