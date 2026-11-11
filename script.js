
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const dateField = document.querySelector('[name="preferred_date"]');
if (dateField) {
  const now = new Date();
  const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  dateField.min = localDate.toISOString().slice(0, 10);
}

const cursor = document.getElementById('cursor');

if (cursor && matchMedia('(pointer:fine) and (prefers-reduced-motion:no-preference)').matches) {
  let last = 0;
  document.addEventListener('pointermove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';

    if (Date.now() - last > 90) {
      last = Date.now();
      const t = document.createElement('span');
      t.className = 'trail';
      const icon = document.createElement('img');
      icon.src = 'footprint-cursor.svg';
      icon.alt = '';
      t.appendChild(icon);
      t.style.left = e.clientX + 'px';
      t.style.top = e.clientY + 'px';
      document.body.appendChild(t);
      setTimeout(() => t.remove(), 680);
    }
  });
}

const form = document.getElementById('requestForm');
const status = document.getElementById('formStatus');

if (form && status) {
  form.addEventListener('submit', async e => {
    e.preventDefault();

    const cfg = window.FF_CONFIG || {};

    if (!cfg.supabaseUrl || !cfg.supabaseAnonKey) {
      status.textContent = 'Booking is not connected yet.';
      return;
    }

    const data = Object.fromEntries(new FormData(form));
    const button = form.querySelector('button[type="submit"]');

    if (button) button.disabled = true;
    status.textContent = 'Sending your request...';

    try {
      const url = cfg.supabaseUrl.replace(/\/$/, '') + '/rest/v1/booking_requests';

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': cfg.supabaseAnonKey,
          'Authorization': 'Bearer ' + cfg.supabaseAnonKey,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          customer_name: data.name,
          phone: data.phone,
          email: data.email,
          service_type: data.service,
          address: data.city,
          preferred_date: data.preferred_date || null,
          preferred_time: data.preferred_time || null,
          notes: data.details || '',
          status: 'pending'
        })
      });

      if (!response.ok) {
        throw new Error('Booking request failed: ' + response.status);
      }

      form.reset();
      status.textContent = 'Request received! We will contact you soon. Your appointment is not confirmed yet.';

    } catch (err) {
      console.error('Booking error:', err);
      status.textContent = 'We could not submit your request. Please try again later.';
    } finally {
      if (button) button.disabled = false;
    }
  });
}
