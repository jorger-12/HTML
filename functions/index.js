const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const {google} = require("googleapis");

const SHEET_ID = "1RbJ1hiTu5eeUJs5VF25bMPSZPsRbYzSR7Pb1OhK_0P8";

exports.syncConsultationToSheet = onDocumentCreated(
    "consultationRequests/{docId}",
    async (event) => {
      const lead = event.data.data();

      const auth = new google.auth.GoogleAuth({
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      });

      const sheets = google.sheets({
        version: "v4",
        auth,
      });

      await sheets.spreadsheets.values.append({
        spreadsheetId: SHEET_ID,
        range: "Sheet1!A:G",
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [
            [
              new Date().toLocaleString(),
              lead.name || "",
              lead.email || "",
              lead.phone || "",
              lead.company || "",
              lead.service || "",
              lead.project || "",
            ],
          ],
        },
      });
    },
);
