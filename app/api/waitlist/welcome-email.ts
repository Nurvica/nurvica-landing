export function getWelcomeEmail(): string {
  const siteUrl = process.env.SITE_URL || "https://nurvica.co";
  const logoUrl = `${siteUrl}/logo-full.png`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to NURVICA</title>
</head>
<body style="margin:0; padding:0; background-color:#F8F5EF; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F8F5EF;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px; background-color:#ffffff; border-radius:16px; overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background-color:#EFE6D7; padding:36px; text-align:center;">
              <img src="${logoUrl}" alt="NURVICA" width="100" height="auto" style="display:block; margin:0 auto;" />
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 36px;">
              <h1 style="margin:0 0 20px; font-size:24px; font-weight:500; color:#1D2A1F; line-height:1.3;">
                You're on the list.
              </h1>
              <p style="margin:0 0 18px; font-size:15px; color:#444; line-height:1.7; font-weight:300;">
                Thank you for joining the NURVICA waitlist. You're now among the first to know when we launch.
              </p>
              <p style="margin:0 0 18px; font-size:15px; color:#444; line-height:1.7; font-weight:300;">
                NURVICA is a personalized hair wellness platform built specifically for Black men and women with textured hair. We're combining AI-powered diagnostics with science-backed education to replace guesswork with guidance that actually fits.
              </p>
              <p style="margin:0 0 18px; font-size:15px; color:#444; line-height:1.7; font-weight:300;">
                We're building this the right way — with intention, cultural specificity, and zero shortcuts. When it's ready, you'll hear from us first.
              </p>

              <!-- Divider -->
              <hr style="border:none; border-top:1px solid #E0D9CE; margin:28px 0;" />

              <p style="margin:0 0 18px; font-size:15px; color:#444; line-height:1.7; font-weight:300;">
                In the meantime, follow the journey:
              </p>

              <!-- Social links -->
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-right:16px;">
                    <a href="https://www.instagram.com/nurvica.co/" target="_blank" style="font-size:14px; color:#1D2A1F; text-decoration:underline; font-weight:400;">
                      Instagram
                    </a>
                  </td>
                  <td>
                    <a href="https://www.tiktok.com/@nurvica.co" target="_blank" style="font-size:14px; color:#1D2A1F; text-decoration:underline; font-weight:400;">
                      TikTok
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 36px; border-top:1px solid #E0D9CE;">
              <p style="margin:0 0 4px; font-size:12px; color:#888; line-height:1.6;">
                NURVICA &middot; Ontario, Canada
              </p>
              <p style="margin:0; font-size:11px; color:#aaa; line-height:1.6; font-style:italic;">
                Rooted in the chair. Grown for the home.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
