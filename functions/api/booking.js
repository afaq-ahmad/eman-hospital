function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
    },
  });
}

export async function onRequestPost(context) {
  try {
    const { request, env } = context;

    const webhookUrl = env.BOOKING_WEBHOOK_URL || env.VITE_BOOKING_WEBHOOK_URL;
    const webhookToken = env.BOOKING_WEBHOOK_TOKEN || env.VITE_BOOKING_WEBHOOK_TOKEN;

    if (!webhookUrl || !webhookToken) {
      return json({ ok: false, error: 'missing_server_config' }, 500);
    }

    const incoming = await request.json();

    const payload = {
      ...incoming,
      token: webhookToken,
    };

    const upstream = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    const raw = await upstream.text();
    let parsed = null;
    try {
      parsed = raw ? JSON.parse(raw) : null;
    } catch {
      parsed = null;
    }

    if (!upstream.ok) {
      return json(
        {
          ok: false,
          error: parsed?.error || raw || `upstream_http_${upstream.status}`,
        },
        502,
      );
    }

    if (!parsed?.ok) {
      return json(
        {
          ok: false,
          error: parsed?.error || parsed?.message || raw || 'upstream_error',
          missing: parsed?.missing,
        },
        400,
      );
    }

    return json(parsed, 200);
  } catch (error) {
    return json(
      {
        ok: false,
        error: 'proxy_exception',
        message: error instanceof Error ? error.message : String(error),
      },
      500,
    );
  }
}
