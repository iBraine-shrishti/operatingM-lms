import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import logoImg from "../../assets/logo-certificate.png";
import { CheckCircle2, ShieldCheck } from "lucide-react";

export const OperatingMediaCertificate = ({
  studentName = "Hiteshpuri Goswami",
  courseTitle = "Diploma in Digital Marketing",
  certificateId = "132929482",
  issueDate = "February 10, 2025",
  expiryDate = "February 10, 2026",
  verificationUrl = null,
  showBorder = true,
  className = "",
}) => {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("");

  // Determine public verification URL
  const publicUrl =
    verificationUrl ||
    (typeof window !== "undefined"
      ? `${window.location.origin}/verify-certificate?id=${certificateId}&name=${encodeURIComponent(
          studentName,
        )}&course=${encodeURIComponent(courseTitle)}`
      : `https://operatingmedia.com/verify-certificate?id=${certificateId}`);

  useEffect(() => {
    let isMounted = true;
    QRCode.toDataURL(publicUrl, {
      width: 240,
      margin: 1,
      color: {
        dark: "#0f172a",
        light: "#ffffff",
      },
    })
      .then((url) => {
        if (isMounted) setQrCodeDataUrl(url);
      })
      .catch((err) => {
        console.error("Error generating QR code:", err);
      });

    return () => {
      isMounted = false;
    };
  }, [publicUrl]);

  // Check if certificate is expired with date condition
  const isExpired = (() => {
    if (!expiryDate) return false;
    const str = String(expiryDate).trim().toLowerCase();
    if (str === "never" || str === "lifetime" || str === "no expiry")
      return false;
    const d = new Date(expiryDate);
    if (!isNaN(d.getTime())) {
      return d.getTime() < Date.now();
    }
    return false;
  })();

  return (
    <div
      data-certificate-document="true"
      className={`certificate-document relative w-full max-w-[920px] mx-auto min-h-[460px] sm:min-h-0 aspect-auto sm:aspect-[1.38/1] select-none overflow-hidden print:w-full print:max-w-none print:shadow-none print:m-0 print:p-0 ${
        showBorder ? "shadow-xl rounded-sm" : ""
      } ${className}`}
      style={{
        backgroundColor: "#ffffff",
        color: "#0f172a",
        colorScheme: "light",
        border: showBorder ? "4px solid #dc2626" : "none", // THICK RED BORDER
        borderRadius: showBorder ? "4px" : "0px",
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <div
        data-cert-paper="true"
        className="w-full h-full relative flex flex-col justify-between p-4 sm:p-7 md:p-9 bg-white"
      >
        {/* Subtle Watermark in background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04] overflow-hidden">
          <img
            src={logoImg}
            alt=""
            className="w-[65%] max-w-[480px] object-contain grayscale mix-blend-multiply"
          />
        </div>

        {/* ========================================================== */}
        {/* 1. TOP SECTION: FOCUSED OPERATING MEDIA BRAND LOGO        */}
        {/* Clear advertising focus, large size, and brand authority */}
        {/* ========================================================== */}
        <div className="relative z-10 flex flex-col items-center justify-center pt-2 sm:pt-3">
          <img
            src={logoImg}
            alt="Operating Media - Digitize Your Career"
            className="h-32 sm:h-40 md:h-48 lg:h-56 w-auto max-w-[92%] object-contain drop-shadow-sm mix-blend-multiply transition-all"
            style={{ filter: "none" }}
          />
          <div className="flex items-center gap-2 mt-1 sm:mt-1.5">
            <span className="h-[1px] w-8 sm:w-16 bg-slate-300" />
            <span className="text-[9px] sm:text-[10.5px] font-bold uppercase tracking-[0.22em] text-slate-500">
              Center of Excellence in Digital Marketing • ISO 9001:2015
            </span>
            <span className="h-[1px] w-8 sm:w-16 bg-slate-300" />
          </div>
        </div>

        {/* ========================================================== */}
        {/* 2. CENTER SECTION: RECOGNITION & STUDENT DETAILS           */}
        {/* Formal Dignified Serif Typography for Student Name (No Cursive) */}
        {/* ========================================================== */}
        <div className="relative z-10 text-center flex-1 flex flex-col justify-center my-3 sm:my-4">
          <p
            className="text-xs sm:text-sm md:text-base font-medium tracking-wider uppercase"
            style={{ color: "#64748b" }}
          >
            This acknowledges that
          </p>

          {/* Student Name: Formal, Dignified Serif Font (No Cursive / No Funny-ness) */}
          <h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] tracking-wide mt-2 sm:mt-2.5 mb-1.5 leading-tight select-none font-bold"
            style={{
              color: "#0f172a",
              fontFamily:
                "'Cinzel', 'Playfair Display', 'Georgia', 'Times New Roman', serif",
              fontStyle: "normal",
              letterSpacing: "0.04em",
            }}
          >
            {studentName}
          </h1>

          <p
            className="text-xs sm:text-sm md:text-base font-medium mt-1 sm:mt-2"
            style={{ color: "#475569" }}
          >
            has successfully completed all academic requirements and is
            officially certified in
          </p>

          {/* Course Title: Sans-Serif font distinctly different from formal serif student name */}
          <div className="mt-1.5 sm:mt-2 w-full max-w-full px-2 sm:px-6 flex justify-center items-center">
            <h2
              className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-[22px] font-bold tracking-tight whitespace-nowrap truncate max-w-full inline-block pb-0.5 sm:pb-1 font-sans"
              style={{
                color: "#0f172a",
                borderBottom: "2px solid #dc2626",
              }}
            >
              {courseTitle}
            </h2>
          </div>
        </div>

        {/* ========================================================== */}
        {/* 3. BOTTOM SECTION: DATES, ID (LEFT) & QR SCANNER (RIGHT)  */}
        {/* ========================================================== */}
        <div
          className="relative z-10 flex items-end justify-between pt-2.5 sm:pt-4"
          style={{ borderTop: "1px solid #e2e8f0" }}
        >
          {/* Bottom Left: Issue Date, Expiry Date (Red when expired), Certificate ID */}
          <div
            className="text-left text-[10px] sm:text-xs md:text-sm font-medium space-y-0.5 sm:space-y-1"
            style={{ color: "#334155" }}
          >
            <div>
              <span style={{ color: "#64748b" }}>Issue Date:</span>{" "}
              <strong style={{ color: "#0f172a" }} className="font-semibold">
                {issueDate}
              </strong>
            </div>
            <div>
              <span style={{ color: "#64748b" }}>Expiry Date:</span>{" "}
              <strong
                style={{ color: isExpired ? "#dc2626" : "#0f172a" }}
                className={`font-semibold ${isExpired ? "text-red-600 font-bold" : ""}`}
              >
                {expiryDate}
                {isExpired && (
                  <span
                    style={{
                      color: "#dc2626",
                      borderColor: "#fca5a5",
                      backgroundColor: "#fef2f2",
                    }}
                    className="ml-1.5 px-1.5 py-0.2 text-[9px] font-bold uppercase rounded border inline-block"
                  >
                    Expired
                  </span>
                )}
              </strong>
            </div>
            <div>
              <span style={{ color: "#64748b" }}>Certificate ID:</span>{" "}
              <strong
                style={{ color: "#0f172a" }}
                className="font-semibold font-mono"
              >
                {certificateId}
              </strong>
            </div>
          </div>

          {/* Bottom Right: Scannable QR Code */}
          <div className="flex flex-col items-center text-center">
            <a
              href={publicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-1 rounded shadow-2xs hover:shadow-md transition-all cursor-pointer"
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #cbd5e1",
              }}
              title="Click or scan to verify credential"
            >
              {qrCodeDataUrl ? (
                <img
                  src={qrCodeDataUrl}
                  alt="Certificate Verification QR Code"
                  className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain block"
                  style={{ backgroundColor: "#ffffff" }}
                />
              ) : (
                <div
                  className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center text-[10px]"
                  style={{ backgroundColor: "#f1f5f9", color: "#94a3b8" }}
                >
                  QR Code
                </div>
              )}
            </a>
            <span
              className="text-[8.5px] sm:text-[9.5px] font-bold uppercase tracking-wider mt-0.5"
              style={{ color: "#64748b" }}
            >
              Scan to Verify
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperatingMediaCertificate;
