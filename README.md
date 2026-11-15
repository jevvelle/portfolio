# Portfolio

Files: index.html, css/style.css, js/main.js, assets/.

Setup
1. In js/main.js set EMAIL to your real email.
2. Create a Google Sheet with headers Time, Name, Email, Type, Message in row 1.
3. Extensions, Apps Script, paste:

   function doPost(e){var p=e.parameter;SpreadsheetApp.getActiveSheet().appendRow([new Date(),p.name,p.email,p.type,p.msg]);return ContentService.createTextOutput("ok");}

4. Deploy, New deployment, Web app, access: Anyone. Copy the URL into SHEET_URL in js/main.js.
5. Add images to assets/ and swap the placeholder boxes in index.html (look for the commented img lines).
6. Upload the whole folder to GitHub Pages.
