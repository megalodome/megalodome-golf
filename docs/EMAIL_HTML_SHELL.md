# MEGALODOME shared email HTML shell

**Contour asset:** https://megalodomegolf.com/images/email/email-bg-course-contours.jpg

## Marketing / campaign body pattern
Use charcoal fallback + background-image + gold CTA + Wheaton footer.

```html
<div style="background-color:#1A1A1A;background-image:url('https://megalodomegolf.com/images/email/email-bg-course-contours.jpg');background-repeat:no-repeat;background-position:right center;background-size:cover;padding:28px 12px;font-family:Arial,Helvetica,sans-serif;color:#F0E8D0;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;">
    <tr><td style="padding:8px 8px 16px;text-align:center;">
      <div style="font-size:11px;letter-spacing:0.22em;color:#EEDCA7;text-transform:uppercase;">MEGALODOME GOLF</div>
      <div style="margin-top:8px;font-size:22px;color:#F7EDD5;font-weight:600;">{{subject_line}}</div>
    </td></tr>
    <tr><td style="padding:8px;">
      <div style="background:rgba(10,10,10,0.72);border:1px solid rgba(238,220,167,0.25);border-radius:14px;padding:22px 20px;line-height:1.6;color:#F0E8D0;">
        {{body_html}}
        <div style="margin-top:22px;text-align:center;">
          <a href="{{cta_url}}" style="display:inline-block;background:#EEDCA7;color:#14110A;text-decoration:none;font-weight:700;padding:12px 22px;border-radius:999px;">{{cta_label}}</a>
        </div>
      </div>
    </td></tr>
    <tr><td style="padding:18px 8px 8px;text-align:center;font-size:12px;line-height:1.5;color:#D4C9A8;">
      MEGALODOME GOLF · 400 Knoll Street, unit C · Wheaton, IL 60187<br/>
      <a href="https://megalodomegolf.com" style="color:#EEDCA7;text-decoration:none;">megalodomegolf.com</a>
      · Not an offer to sell securities. Reg D 506(c) materials by request.
    </td></tr>
  </table>
</div>
```

## System / onboarding emails
SuiteDash Email Branding cannot set body background-image. Rely on:
- Main `#1A1A1A` · Footer `#111111`
- From name: MEGALODOME GOLF
- Copyright + Wheaton disclaimer (set in Email Branding)

## CTAs
| Stream | URL | Label |
|---|---|---|
| Investors / booking | https://app.megalodomegolf.com/book | Book a 20-min call |
| Vendors | https://app.megalodomegolf.com/partners | Vendor / developer form |
| NDA | https://app.megalodomegolf.com/nda (or long frm if slug pending) | Request NDA |
| Site invest | https://megalodomegolf.com/invest | Investor information |
