export function getWelcomeEmail(): string {
  const raw = (process.env.SITE_URL || "https://nurvica.com").replace(/\/+$/, "");
  const siteUrl = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  const logoUrl = `${siteUrl}/icon.png`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="only light" />
  <meta name="supported-color-schemes" content="only light" />
  <title>Welcome to NURVICA</title>
</head>
<body style="margin:0; padding:0; background-color:#F8F5EF; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F8F5EF;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px; background-color:#ffffff; border-radius:16px; overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background-color:#1D2A1F; padding:40px 36px; text-align:center;">
              <img src="${logoUrl}" alt="NURVICA" width="72" height="72" style="display:block; margin:0 auto 12px;" />
              <div style="font-family:Georgia, 'Times New Roman', serif; font-size:22px; letter-spacing:0.18em; color:#ffffff; font-weight:500;">
                NURVICA
              </div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 36px;">
              <h1 style="margin:0 0 20px; font-size:24px; font-weight:500; color:#1D2A1F; line-height:1.3;">
                You're on the list.
              </h1>
              <p style="margin:0 0 18px; font-size:15px; color:#444; line-height:1.7; font-weight:300;">
                Thank you for joining the NURVICA waitlist. You're officially first in line.
              </p>
              <p style="margin:0 0 18px; font-size:15px; color:#444; line-height:1.7; font-weight:300;">
                NURVICA is being built for Black men and women with textured hair. We're creating a space where guidance actually fits the person it's meant for, where the science is real, and where the culture is part of the foundation rather than an afterthought.
              </p>
              <p style="margin:0 0 18px; font-size:15px; color:#444; line-height:1.7; font-weight:300;">
                This is taking time because we're doing it properly. We'd rather get it right than get it fast, and the people we're building for deserve nothing less.
              </p>

              <!-- Divider -->
              <hr style="border:none; border-top:1px solid #E0D9CE; margin:28px 0;" />

              <p style="margin:0 0 18px; font-size:15px; color:#444; line-height:1.7; font-weight:300;">
                Until launch, you can follow what we're up to here:
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
