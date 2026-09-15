# Seamless Web Builder

same to same ui bna kr dena mujhe or same contant
har pages bn kr de do

next js
node
mongodb database

backend ka code aalg aalg rkhna hai to us hisab se bna kr dena mujhe

sab kch bna kr dena

note:mobile response ban kar de do best to best bna kr dena

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f5cd07c1-6454-4315-9489-e14500f1ea1d).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Gmail SMTP and Vikas Mitra emails

In the sending Google account, enable 2-Step Verification and create an
[App Password](https://support.google.com/accounts/answer/185833).
Add the settings from `.env.example` to `.env.local`:

```dotenv
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-account@gmail.com
SMTP_PASS=your-google-app-password
```

Use the App Password without spaces, not the normal Gmail password. Set the same
variables in your hosting provider's server environment, then restart/redeploy.
Never prefix these variables with `NEXT_PUBLIC_`. `EMAIL_FROM` is optional and
defaults to the SMTP account; only use an authorized sending address or alias.

- Registration sends an acknowledgement to the applicant's required email address.
- Approval sends the unique ID and a personalized PNG using the original `src/assets/vikas-mitra-id-card.png`
  photograph, preserving its card artwork, desk and lanyard. The existing photo, QR and
  sample fields are replaced with the applicant’s photo, name, role, district, member ID
  and mobile. The QR code contains the member ID; no expiry date is invented.
- Rejection sends the owner's rejection message to the applicant.
- Email failure does not undo a saved application or admin decision. The admin
  sees delivery status, and can retry using **Email Card** or **Reject**.
- SMTP takes precedence when `SMTP_HOST` is configured. Otherwise, the existing
  Resend integration is available using `RESEND_API_KEY` and `EMAIL_FROM`.

After configuration, submit a test application using an inbox you control, then
approve it and confirm the card attachment arrives. Use a separate test application
to check the rejection email.

## Automatic demo websites

The personalised demo form requires an email address. On successful submission it
stores the request, creates a public `/demo/{id}` page from the submitted name,
location, post and phone number, and emails that unique link through SMTP. Set
`SITE_URL=https://bharatpahchan.com` in production so links always use the live domain.
