/* eslint-disable max-len */

const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const {google} = require("googleapis");
const {Resend} = require("resend");

const SHEET_ID = "1RbJ1hiTu5eeUJs5VF25bMPSZPsRbYzSR7Pb1OhK_0P8";

const ALERT_TO = "leads@skintlsc.com";
const ALERT_FROM = "SK International <hello@skintlsc.com>";

/**
 * Escapes HTML content for safe email rendering.
 * @param {*} value
 * @return {string}
 */
function safe(value) {
  return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
}

exports.syncConsultationToSheet = onDocumentCreated(
    {
      document: "consultationRequests/{docId}",
      secrets: ["RESEND_API_KEY"],
    },
    async (event) => {
      const lead = event.data.data();

      const submittedAt = new Date().toLocaleString("en-US", {
        timeZone: "America/Denver",
      });

      const name = safe(lead.name);
      const email = safe(lead.email);
      const phone = safe(lead.phone);
      const company = safe(lead.company);
      const service = safe(lead.service);
      const project = safe(lead.project);

      const auth = new google.auth.GoogleAuth({
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      });

      const sheets = google.sheets({
        version: "v4",
        auth,
      });

      await sheets.spreadsheets.values.append({
        spreadsheetId: SHEET_ID,
        range: "Sheet1!A:I",
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [
            [
              submittedAt,
              lead.name || "",
              lead.email || "",
              lead.phone || "",
              lead.company || "",
              lead.service || "",
              lead.project || "",
              "NEW",
              "",
            ],
          ],
        },
      });

      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: ALERT_FROM,
        to: ALERT_TO,
        subject: `New Lead — ${lead.name || "Website Consultation"}`,
        html: `
          <div style="margin:0;padding:0;background:#050505;font-family:Arial,sans-serif;color:#ffffff;">
            <div style="max-width:680px;margin:0 auto;padding:34px 18px;">
              <div style="border:1px solid #e4c376;border-radius:18px;overflow:hidden;background:#101010;">
                
                <div style="padding:28px;background:#000;border-bottom:1px solid #e4c376;">
                  <div style="color:#e4c376;font-size:12px;letter-spacing:3px;font-weight:bold;">
                    NEW LEAD
                  </div>
                  <h1 style="margin:10px 0 0;font-size:28px;color:#ffffff;">
                    SK International
                  </h1>
                  <p style="margin:8px 0 0;color:#cfcfcf;">
                    A new consultation request has been submitted.
                  </p>
                </div>

                <div style="padding:28px;">
                  <h2 style="margin:0 0 18px;color:#e4c376;font-size:18px;">
                    Lead Details
                  </h2>

                  <p><strong>Name:</strong> ${name}</p>
                  <p>
                    <strong>Email:</strong>
                    <a href="mailto:${email}" style="color:#e4c376;">
                      ${email}
                    </a>
                  </p>

                  <p>
                    <strong>Phone:</strong>
                    <a href="tel:${phone}" style="color:#e4c376;">
                      ${phone}
                    </a>
                  </p>

                  <p><strong>Company:</strong> ${company}</p>
                  <p><strong>Service:</strong> ${service}</p>

                  <div style="margin-top:24px;padding:18px;border-radius:14px;background:#181818;border:1px solid #333;">
                    <strong style="color:#e4c376;">Project Details</strong>
                    <p style="line-height:1.6;color:#eeeeee;">
                      ${project}
                    </p>
                  </div>

                  <p style="margin-top:24px;color:#bdbdbd;font-size:13px;">
                    Submitted: ${submittedAt}
                  </p>
                </div>
              </div>
            </div>
          </div>
        `,
      });

      if (lead.email) {
        await resend.emails.send({
          from: ALERT_FROM,
          to: lead.email,
          subject: "We received your consultation request — SK International",
          html: `
            <div style="margin:0;padding:0;background:#050505;font-family:Arial,sans-serif;color:#ffffff;">
              <div style="max-width:640px;margin:0 auto;padding:34px 18px;">
                <div style="border:1px solid #e4c376;border-radius:18px;overflow:hidden;background:#101010;">
                  
                  <div style="padding:30px;background:#000;border-bottom:1px solid #e4c376;">
                    <div style="color:#e4c376;font-size:12px;letter-spacing:3px;font-weight:bold;">
                      REQUEST RECEIVED
                    </div>

                    <h1 style="margin:10px 0 0;font-size:28px;color:#ffffff;">
                      Thank you, ${name || "there"}.
                    </h1>

                    <p style="margin:10px 0 0;color:#cfcfcf;">
                      Your consultation request has been received by SK International.
                    </p>
                  </div>

                  <div style="padding:28px;">
                    <p style="line-height:1.7;color:#eeeeee;">
                      Our team will review your submission and reach out shortly.
                    </p>

                    <div style="margin-top:22px;padding:18px;border-radius:14px;background:#181818;border:1px solid #333;">
                      <p>
                        <strong style="color:#e4c376;">
                          Service Requested:
                        </strong>
                        ${service}
                      </p>

                      <p>
                        <strong style="color:#e4c376;">
                          Company:
                        </strong>
                        ${company || "Not provided"}
                      </p>
                    </div>

                    <p style="margin-top:26px;color:#bdbdbd;font-size:13px;">
                      SK International<br>
                      Strategic consulting, digital systems, and premium business solutions.
                    </p>

                    <a
                      href="https://skintlsc.com"
                      style="display:inline-block;margin-top:12px;padding:12px 18px;background:#e4c376;color:#000;text-decoration:none;border-radius:999px;font-weight:bold;"
                    >
                      Visit Website
                    </a>
                  </div>
                </div>
              </div>
            </div>
          `,
        });
      }
    },
);