const EVENTBRITE_URL =
  "https://www.eventbrite.ca/e/the-crown-experience-tickets-2000898869381";

export function getEventInviteEmail(): string {
  const raw = (process.env.SITE_URL || "https://nurvica.com").replace(/\/+$/, "");
  const siteUrl = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  const logoUrl = `${siteUrl}/email/nurvica-icon.png`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="only light" />
  <meta name="supported-color-schemes" content="only light" />
  <title>You're invited: The Crown Experience</title>
</head>
<body style="margin:0; padding:0; background-color:#F8F5EF; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F8F5EF;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px; background-color:#ffffff; border-radius:16px; overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background-color:#EFE6D7; padding:40px 36px; text-align:center;">
              <img src="${logoUrl}" alt="NURVICA" width="80" height="72" style="display:block; margin:0 auto 12px;" />
              <div style="font-family:Georgia, 'Times New Roman', serif; font-size:22px; letter-spacing:0.18em; color:#1D2A1F; font-weight:500;">
                NURVICA
              </div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 36px;">
              <div style="display:inline-block; padding:5px 12px; background-color:#EFE6D7; border-radius:100px; font-family:'Courier New', monospace; font-size:11px; letter-spacing:0.08em; color:#2F3F2E; text-transform:uppercase; margin-bottom:20px;">
                In-Person Event
              </div>
              <h1 style="margin:0 0 20px; font-size:26px; font-weight:500; color:#1D2A1F; line-height:1.3;">
                You're invited: The Crown Experience
              </h1>
              <p style="margin:0 0 24px; font-size:15px; color:#444; line-height:1.7; font-weight:300;">
                This is the textured-hair community coming together to connect, celebrate, and shape what NURVICA becomes next &mdash; and we'd love for you to be in the room.
              </p>

              <!-- Details card -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F8F5EF; border:0.5px solid #E0D9CE; border-radius:12px; margin-bottom:24px;">
                <tr>
                  <td style="padding:22px 24px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-bottom:14px; vertical-align:top; width:88px;">
                          <span style="font-family:'Courier New', monospace; font-size:11px; letter-spacing:0.06em; color:#888; text-transform:uppercase;">Date</span>
                        </td>
                        <td style="padding-bottom:14px; font-size:14px; color:#1D2A1F; font-weight:500;">
                          Saturday, October 17, 2026
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom:14px; vertical-align:top;">
                          <span style="font-family:'Courier New', monospace; font-size:11px; letter-spacing:0.06em; color:#888; text-transform:uppercase;">Time</span>
                        </td>
                        <td style="padding-bottom:14px; font-size:14px; color:#1D2A1F; font-weight:500;">
                          12:00 PM &ndash; 4:00 PM EST
                        </td>
                      </tr>
                      <tr>
                        <td style="vertical-align:top;">
                          <span style="font-family:'Courier New', monospace; font-size:11px; letter-spacing:0.06em; color:#888; text-transform:uppercase;">Venue</span>
                        </td>
                        <td style="font-size:14px; color:#1D2A1F; font-weight:500; line-height:1.5;">
                          Toronto Public Library &mdash; Palmerston Branch<br />
                          560 Palmerston Avenue, Toronto, ON M6G 2P7
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 12px; font-size:15px; color:#444; line-height:1.7; font-weight:300;">
                On the day:
              </p>
              <ul style="margin:0 0 24px; padding-left:20px; font-size:15px; color:#444; line-height:1.9; font-weight:300;">
                <li>A live scalp examination with a licensed trichologist</li>
                <li>A professional panel discussion on textured hair health</li>
                <li>Community networking and light refreshments</li>
              </ul>

              <!-- CTA -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 8px;">
                <tr>
                  <td style="background-color:#C7A77A; border-radius:8px;">
                    <a href="${EVENTBRITE_URL}" target="_blank" style="display:inline-block; padding:14px 32px; font-size:14px; font-weight:500; color:#1D2A1F; text-decoration:none; letter-spacing:0.02em;">
                      Get Your Ticket
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 28px; font-size:12px; color:#888; line-height:1.6;">
                Tickets from $12.25 CAD &middot; Space is limited
              </p>

              <!-- Divider -->
              <hr style="border:none; border-top:1px solid #E0D9CE; margin:0 0 24px;" />

              <p style="margin:0; font-size:14px; color:#444; line-height:1.7; font-weight:300;">
                You're getting this because you joined the NURVICA waitlist. We can't wait to meet you in person.
              </p>
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
