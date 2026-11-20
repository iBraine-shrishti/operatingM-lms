import fs from "fs";
import path from "path";
import QRCode from "qrcode";
import { execSync } from "child_process";

async function generate() {
  const logoPath = "D:/operating-media/LMS/src/assets/logo-certificate-blue.png";
  const logoBase64 = fs.readFileSync(logoPath).toString("base64");
  const logoDataUrl = "data:image/png;base64," + logoBase64;

  const certId = "OMC-DEMO-2026";
  const studentName = "YOUR NAME";
  const courseTitle = "COURSE NAME";
  const issueDate = "Feb 10, 2026";
  const expiryDate = "February 10, 2026";
  const verifyUrl = `https://operatingmedia.com/verify-certificate?id=${certId}&name=${encodeURIComponent(
    studentName
  )}&course=${encodeURIComponent(courseTitle)}`;

  const qrDataUrl = await QRCode.toDataURL(verifyUrl, {
    width: 320,
    margin: 1,
    color: { dark: "#0f172a", light: "#ffffff" },
  });

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Operating Media Certificate - ${studentName}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@700&display=swap" rel="stylesheet">
  <style>
    @page {
      size: 297mm 210mm; /* A4 Landscape exact */
      margin: 0;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    html, body {
      width: 297mm;
      height: 210mm;
      overflow: hidden;
      background-color: #ffffff;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #0f172a;
    }
    .cert-frame {
      width: 297mm;
      height: 210mm;
      padding: 7mm;
      position: relative;
      background: #ffffff;
    }
    .cert-border {
      width: 100%;
      height: 100%;
      border: 5px solid #2563eb;
      border-radius: 2px;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 7mm 12mm 8mm 12mm;
      background: #ffffff;
      overflow: hidden;
    }
    .watermark {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 125mm;
      opacity: 0.038;
      pointer-events: none;
      filter: grayscale(100%);
      mix-blend-mode: multiply;
      z-index: 1;
    }
    .header-section {
      position: relative;
      z-index: 10;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    .logo-img {
      height: 48mm;
      max-width: 130mm;
      object-fit: contain;
      display: block;
      margin: 0 auto;
    }
    .sub-brand {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 14px;
      margin-top: 2.5mm;
      width: 100%;
    }
    .line {
      height: 1px;
      width: 26mm;
      background-color: #cbd5e1;
    }
    .tagline {
      font-size: 8.5pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.22em;
      color: #64748b;
    }
    .body-section {
      position: relative;
      z-index: 10;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 3mm 0;
      flex: 1;
    }
    .ack-text {
      font-size: 9.5pt;
      font-weight: 600;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: #64748b;
      margin-bottom: 2mm;
    }
    .student-name {
      font-family: 'Cinzel', 'Playfair Display', Georgia, serif;
      font-size: 32pt;
      font-weight: 800;
      letter-spacing: 0.04em;
      color: #0f172a;
      line-height: 1.15;
      margin: 1.5mm 0 2.5mm 0;
    }
    .completed-text {
      font-size: 10pt;
      font-weight: 500;
      color: #475569;
      margin-bottom: 3mm;
    }
    .course-title-wrap {
      display: inline-block;
      border-bottom: 2.5px solid #2563eb;
      padding-bottom: 3.5mm;
      padding-left: 6mm;
      padding-right: 6mm;
      line-height: 1.4;
    }
    .course-title {
      font-size: 17pt;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.01em;
      font-family: 'Inter', sans-serif;
    }
    .footer-section {
      position: relative;
      z-index: 10;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      border-top: 1px solid #e2e8f0;
      padding-top: 3mm;
    }
    .meta-details {
      text-align: left;
      font-size: 8.5pt;
      color: #334155;
      line-height: 1.65;
    }
    .meta-label {
      color: #64748b;
      font-weight: 500;
    }
    .meta-val {
      color: #0f172a;
      font-weight: 700;
    }
    .meta-id {
      font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
      font-size: 9pt;
      letter-spacing: 0.05em;
    }
    .qr-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    .qr-box {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      padding: 2.5px;
      display: block;
    }
    .qr-img {
      width: 17mm;
      height: 17mm;
      display: block;
    }
    .qr-label {
      font-size: 7pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: #64748b;
      margin-top: 1.5mm;
    }
  </style>
</head>
<body>
  <div class="cert-frame">
    <div class="cert-border">
      <img src="${logoDataUrl}" class="watermark" alt="">
      
      <div class="header-section">
        <img src="${logoDataUrl}" class="logo-img" alt="Operating Media - Digitize Your Career">
        <div class="sub-brand">
          <span class="line"></span>
          <span class="tagline">Center of Excellence in Digital Marketing &bull; ISO 9001:2015</span>
          <span class="line"></span>
        </div>
      </div>

      <div class="body-section">
        <p class="ack-text">This acknowledges that</p>
        <h1 class="student-name">${studentName}</h1>
        <p class="completed-text">has successfully completed all academic requirements and is officially certified in</p>
        <div class="course-title-wrap">
          <h2 class="course-title">${courseTitle}</h2>
        </div>
      </div>

      <div class="footer-section">
        <div class="meta-details">
          <div><span class="meta-label">Issue Date:</span> <strong class="meta-val">${issueDate}</strong></div>
          <div><span class="meta-label">Expiry Date:</span> <strong class="meta-val" style="color: #dc2626;">${expiryDate} <span style="color: #dc2626; border: 1px solid #fca5a5; background-color: #fef2f2; padding: 1px 4.5px; font-size: 7pt; font-weight: 800; text-transform: uppercase; border-radius: 3px; margin-left: 5px; display: inline-block; vertical-align: middle;">EXPIRED</span></strong></div>
          <div><span class="meta-label">Certificate ID:</span> <strong class="meta-val meta-id">${certId}</strong></div>
        </div>

        <div class="qr-section">
          <div class="qr-box">
            <img src="${qrDataUrl}" class="qr-img" alt="QR">
          </div>
          <span class="qr-label">Scan to Verify</span>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;

  const tmpHtml = "D:/operating-media/temp_cert.html";
  fs.writeFileSync(tmpHtml, html, "utf8");

  const chromePath = "C:/Program Files/Google/Chrome/Application/chrome.exe";

  const targets = [
    "D:/operating-media/Operating_Media_Certificate_YOUR_NAME.pdf",
    "D:/operating-media/Operating Media – digitize your career _ LMS.pdf",
  ];

  for (const pdfOutput of targets) {
    const cmd = `"${chromePath}" --headless --disable-gpu --run-all-compositor-stages-before-draw --no-pdf-header-footer --print-to-pdf="${pdfOutput}" "${tmpHtml}"`;
    execSync(cmd, { stdio: "inherit" });
    console.log("PDF Generated Successfully at:", pdfOutput);
  }

  if (fs.existsSync(tmpHtml)) {
    fs.unlinkSync(tmpHtml);
  }
}

generate().catch(console.error);
