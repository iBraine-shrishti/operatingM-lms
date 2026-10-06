import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import logoImg from "../../assets/logo.png";
import { CheckCircle2, ExternalLink } from "lucide-react";

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
          studentName
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

  return (
    <div
      className={`relative w-full max-w-[920px] mx-auto min-h-[450px] sm:min-h-0 aspect-auto sm:aspect-[1.38/1] bg-white text-slate-900 select-none overflow-hidden print:w-full print:max-w-none print:shadow-none print:m-0 print:p-0 ${
        showBorder ? "shadow-2xl rounded-sm" : ""
      } ${className}`}
      style={{
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* ============================================================== */}
      {/* 1. OUTER MULTI-COLOR BORDER FRAME                              */}
      {/* Mixture of Operating Media Logo Colors: Red, Orange, Amber, Lime, Blue */}
      {/* ============================================================== */}
      <div
        className="w-full h-full p-2 sm:p-4 md:p-5 relative"
        style={{
          background:
            "linear-gradient(135deg, #dc2626 0%, #ea580c 22%, #f59e0b 45%, #84cc16 70%, #2563eb 100%)",
        }}
      >
        {/* ============================================================== */}
        {/* 2. WHITE INSET SPACER CHANNEL                                  */}
        {/* ============================================================== */}
        <div className="w-full h-full bg-white p-1 sm:p-2 relative flex flex-col justify-between">
          {/* ============================================================== */}
          {/* 3. INNER MULTI-COLOR ACCENT BORDER                             */}
          {/* ============================================================== */}
          <div
            className="w-full h-full relative flex flex-col justify-between p-3.5 sm:p-7 md:p-9 border-[2px]"
            style={{
              borderColor: "#ea580c",
              borderImage:
                "linear-gradient(135deg, #dc2626, #ea580c, #f59e0b, #84cc16, #2563eb) 1",
            }}
          >
            {/* Subtle Watermark in background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.035] overflow-hidden">
              <img
                src={logoImg}
                alt=""
                className="w-[70%] max-w-[500px] object-contain grayscale"
              />
            </div>

            {/* ========================================================== */}
            {/* 4. TOP SECTION: CIRCULAR CERTIFICATION SEAL                */}
            {/* Circular badge inspired by Google certificate seal         */}
            {/* ========================================================== */}
            <div className="relative z-10 flex flex-col items-center justify-center pt-1">
              <div className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center">
                {/* SVG Dotted Outer Ring & Circular Typography */}
                <svg
                  viewBox="0 0 160 160"
                  className="absolute inset-0 w-full h-full overflow-visible"
                >
                  {/* Outer Dotted Circle Ring matching CERTIFICATE.png */}
                  <circle
                    cx="80"
                    cy="80"
                    r="74"
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="1.6"
                    strokeDasharray="3 3.5"
                  />

                  {/* Arc Paths for circular text */}
                  <path
                    id="topCurveOM"
                    d="M 22,80 A 58,58 0 0,1 138,80"
                    fill="none"
                  />
                  <path
                    id="bottomCurveOM"
                    d="M 138,80 A 58,58 0 0,1 22,80"
                    fill="none"
                  />

                  {/* Top Text: OPERATING MEDIA */}
                  <text
                    className="text-[9.5px] font-black uppercase tracking-[0.22em] fill-slate-700"
                    textAnchor="middle"
                  >
                    <textPath href="#topCurveOM" startOffset="50%">
                      OPERATING MEDIA
                    </textPath>
                  </text>

                  {/* Bottom Text: CERTIFIED */}
                  <text
                    className="text-[9px] font-black uppercase tracking-[0.26em] fill-slate-600"
                    textAnchor="middle"
                  >
                    <textPath href="#bottomCurveOM" startOffset="50%">
                      • CERTIFIED •
                    </textPath>
                  </text>
                </svg>

                {/* Inner Center Circle with Logo & Color Ring */}
                <div
                  className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-full p-[2.5px] shadow-sm flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, #dc2626 0%, #ea580c 25%, #f59e0b 50%, #84cc16 75%, #2563eb 100%)",
                  }}
                >
                  <div className="w-full h-full bg-white rounded-full flex items-center justify-center p-1.5 overflow-hidden">
                    <img
                      src={logoImg}
                      alt="Operating Media"
                      className="w-full h-auto max-h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ========================================================== */}
            {/* 5. CENTER SECTION: RECOGNITION & STUDENT DETAILS           */}
            {/* Matches layout of sample Google certificate                */}
            {/* ========================================================== */}
            <div className="relative z-10 text-center flex-1 flex flex-col justify-center my-2 sm:my-3">
              <p className="text-xs sm:text-base md:text-lg font-medium text-slate-700 tracking-normal">
                This acknowledges that
              </p>

              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] text-slate-900 tracking-normal mt-1 sm:mt-2 leading-tight select-none"
                style={{
                  fontFamily: "'Dancing Script', 'Playfair Display', cursive, serif",
                  fontStyle: "italic",
                  fontWeight: 700,
                }}
              >
                {studentName}
              </h1>

              <p className="text-xs sm:text-sm md:text-base font-medium text-slate-600 mt-2 sm:mt-3 md:mt-4">
                Has successfully completed and is certified in
              </p>

              {/* Course Title: Guaranteed single line with colored underline */}
              <div className="mt-1 sm:mt-1.5 w-full max-w-full px-2 sm:px-6 flex justify-center items-center">
                <h2
                  className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-[22px] font-bold text-slate-900 tracking-tight whitespace-nowrap truncate max-w-full inline-block pb-0.5 sm:pb-1"
                  style={{
                    borderBottom: "2.5px solid #dc2626",
                  }}
                >
                  {courseTitle}
                </h2>
              </div>
            </div>

            {/* ========================================================== */}
            {/* 6. BOTTOM SECTION: DATES, ID (LEFT) & QR SCANNER (RIGHT)  */}
            {/* ========================================================== */}
            <div className="relative z-10 flex items-end justify-between pt-2 sm:pt-4 border-t border-slate-100/80">
              {/* Bottom Left: Issue Date, Expiry Date, Certificate ID */}
              <div className="text-left text-[10px] sm:text-xs md:text-sm text-slate-700 font-medium space-y-0.5 sm:space-y-1">
                <div>
                  <span className="text-slate-500">Issue Date:</span>{" "}
                  <strong className="text-slate-900 font-semibold">{issueDate}</strong>
                </div>
                <div>
                  <span className="text-slate-500">Expiry Date:</span>{" "}
                  <strong className="text-slate-900 font-semibold">{expiryDate}</strong>
                </div>
                <div>
                  <span className="text-slate-500">Certificate ID:</span>{" "}
                  <strong className="text-slate-900 font-semibold">{certificateId}</strong>
                </div>
              </div>

              {/* Bottom Right: Scannable QR Code */}
              <div className="flex flex-col items-center text-center">
                <a
                  href={publicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-1 bg-white border border-slate-300 rounded shadow-2xs hover:shadow-md transition-all cursor-pointer"
                  title="Click or scan to verify credential"
                >
                  {qrCodeDataUrl ? (
                    <img
                      src={qrCodeDataUrl}
                      alt="Certificate Verification QR Code"
                      className="w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 object-contain block"
                    />
                  ) : (
                    <div className="w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-slate-100 flex items-center justify-center text-[10px] text-slate-400">
                      QR Code
                    </div>
                  )}
                </a>
                <span className="text-[8.5px] sm:text-[9.5px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">
                  Scan to Verify
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperatingMediaCertificate;
