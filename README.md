# Fresh Footprints Carpet Care — Website starter

## What works immediately
- Responsive black/gold website with services, navigation, booking form UI, and desktop footprint cursor/trail.
- Mobile-friendly layout. No paid hosting required for a public GitHub Pages repository.

## What is not active yet
- Booking form **will not send data** until you connect Supabase in `config.js`.
- No email/SMS notifications or customer self-service accounts are included.
- Booking approval is managed by you in the Supabase dashboard, not an on-site admin panel.
- The circular footprint mark is a **temporary placeholder**, not your exact logo. Replace it after supplying your original transparent logo file.
- The hero uses stylized art rather than a real equipment photograph. Add your own licensed/real photos.

## Publish free with GitHub Pages
1. Create a free GitHub account.
2. Create a PUBLIC repository named `fresh-footprints-site`.
3. Upload `index.html`, `style.css`, `script.js`, and `config.js` to the repository root.
4. In repository Settings > Pages, choose **Deploy from a branch**, `main`, `/ (root)` and Save.
5. Your free site URL will be `https://YOUR-USERNAME.github.io/fresh-footprints-site/`.

## Connect secure booking submissions (free-tier usage limits apply)
1. Create a Supabase project at https://supabase.com .
2. Open SQL Editor and run `supabase-setup.sql`.
3. In Supabase project settings, find the Project URL and **publishable/anon** key.
4. Enter those two values in `config.js`, commit the update, and wait for GitHub Pages deployment.
5. Submit a test booking. Review requests in Supabase Table Editor > booking_requests.
6. Update `status` from `pending` to `approved` only after you confirm with the customer.
7. Set up notification delivery separately if you want alerts; without it, you must check the Supabase dashboard.

## Important security and launch notes
- NEVER paste your Supabase service_role/secret key into any website file.
- Anonymous submissions are intentionally INSERT-only. No customer data is readable by anonymous visitors.
- Add anti-spam protection and a privacy policy before going live with real customer data.
- Free-tier limits and product features can change.
- Custom .com domain registration is not free; hosting can remain free.
