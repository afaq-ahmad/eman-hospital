# eman-hospital

## Online Consultation webhook setup (Google Apps Script)

This project now sends booking submissions from the final consultation step to a Google Apps Script webhook.

### Required environment variables

Create a `.env` file locally (and set the same in Cloudflare Pages):

```bash
VITE_BOOKING_WEBHOOK_URL="https://script.google.com/macros/s/REPLACE_ME/exec"
VITE_BOOKING_WEBHOOK_TOKEN="REPLACE_WITH_APP_TOKEN"
```

### Cloudflare Pages (recommended)

Set these in **Pages project → Settings → Environment variables** for your production environment:

```bash
BOOKING_WEBHOOK_URL="https://script.google.com/macros/s/REPLACE_ME/exec"
BOOKING_WEBHOOK_TOKEN="REPLACE_WITH_APP_TOKEN"
```

The frontend now posts to `/api/booking` (a Pages Function) and the function forwards to Apps Script with token server-side.

For local development fallback (without Pages Functions), you can still use:

```bash
VITE_BOOKING_WEBHOOK_URL="https://script.google.com/macros/s/REPLACE_ME/exec"
VITE_BOOKING_WEBHOOK_TOKEN="REPLACE_WITH_APP_TOKEN"
```

### Expected Apps Script payload keys

The frontend sends:

- `token`
- `doctorId`
- `doctorName`
- `patientName`
- `phone`
- `email`
- `slot` (ISO date string)
- `fileName`
- `fileType`
- `fileBase64`

These match the `doPost(e)` script contract used for writing to Google Sheet, uploading file to Drive, and sending admin email notifications.
