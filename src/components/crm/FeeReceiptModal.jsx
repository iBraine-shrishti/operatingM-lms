import React, { useEffect } from "react";
import {
  X,
  Printer,
  Download,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Calendar,
  User,
  Phone,
  Mail,
} from "lucide-react";
import logo from "../../assets/logo.png";

export const FeeReceiptModal = ({ isOpen, onClose, profile }) => {
  if (!isOpen || !profile) return null;

  const {
    admissionNo = "OMC-0266",
    name = "Aditya Jadhav",
    email = "adityajadhav14@gmail.com",
    phone = "+91 80972 12986",
    course = "Masters in Digital Marketing",
    branch = "Andheri Center",
    totalFees = 35000,
    regAmount = 2000,
    totalPaid = 25000,
    balanceDue = 10000,
    installments = [],
  } = profile;

  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handlePrint = () => {
    // Generate clean, isolated single-page document for printing / saving as PDF
    const logoUrl = typeof logo === "string" ? logo : "";
    const resolvedLogoSrc = logoUrl.startsWith("http")
      ? logoUrl
      : window.location.origin + (logoUrl.startsWith("/") ? logoUrl : "/" + logoUrl);

    const rowsHtml = (installments || [])
      .map((inst) => {
        const isPaid = String(inst.status || "").toUpperCase() === "PAID";
        const dateStr = inst.date || inst.dueDate || "N/A";
        const amountNum =
          typeof inst.amount === "number" ? inst.amount : Number(inst.amount) || 0;

        return `
          <tr>
            <td>
              <span class="inst-title">${inst.title || "Fee Installment"}</span>
              <span class="inst-sub">Scheduled: ${dateStr}</span>
            </td>
            <td class="text-center">
              <span class="${isPaid ? "badge-paid" : "badge-pending"}">
                ${isPaid ? "Paid" : "Pending"}
              </span>
            </td>
            <td class="text-right amount-val">&#8377;${amountNum.toLocaleString("en-IN")}</td>
          </tr>
        `;
      })
      .join("");

    const totalPaidNum =
      typeof totalPaid === "number" ? totalPaid : Number(totalPaid) || 0;
    const totalFeesNum =
      typeof totalFees === "number" ? totalFees : Number(totalFees) || 0;
    const balanceDueNum =
      typeof balanceDue === "number" ? balanceDue : Number(balanceDue) || 0;

    const printHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Fee_Receipt_${admissionNo}</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 10mm 12mm;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    html, body {
      margin: 0;
      padding: 0;
      background: #ffffff;
      color: #0f172a;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-size: 11px;
      line-height: 1.4;
    }
    .receipt-container {
      width: 100%;
      max-width: 680px;
      margin: 0 auto;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 12px;
      padding: 20px 24px;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .receipt-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding-bottom: 14px;
      border-bottom: 1.5px solid #e2e8f0;
      margin-bottom: 14px;
    }
    .logo-img {
      height: 38px;
      width: auto;
      object-fit: contain;
      margin-bottom: 4px;
      display: block;
    }
    .org-details {
      font-size: 10.5px;
      color: #64748b;
      line-height: 1.4;
    }
    .ref-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 8px 14px;
      text-align: right;
    }
    .ref-label {
      font-size: 9px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #64748b;
      display: block;
    }
    .ref-val {
      font-size: 16px;
      font-weight: 900;
      color: #0f172a;
      display: block;
      margin: 2px 0;
      letter-spacing: -0.5px;
    }
    .ref-date {
      font-size: 10.5px;
      color: #64748b;
    }
    .dossier-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 10px 14px;
      margin-bottom: 14px;
    }
    .field-label {
      font-size: 9px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #64748b;
      display: block;
      margin-bottom: 2px;
    }
    .field-val-bold {
      font-size: 12.5px;
      font-weight: 800;
      color: #0f172a;
      display: block;
    }
    .field-val-sub {
      font-size: 10.5px;
      color: #64748b;
    }
    table.installments-table {
      width: 100%;
      border-collapse: collapse;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 14px;
    }
    table.installments-table th {
      background: #0f172a;
      color: #ffffff;
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 8px 12px;
      text-align: left;
    }
    table.installments-table th.text-center {
      text-align: center;
    }
    table.installments-table th.text-right {
      text-align: right;
    }
    table.installments-table td {
      padding: 7px 12px;
      border-bottom: 1px solid #f1f5f9;
      font-size: 10.5px;
      color: #334155;
    }
    table.installments-table td.text-center {
      text-align: center;
    }
    table.installments-table td.text-right {
      text-align: right;
    }
    .inst-title {
      font-weight: 700;
      color: #0f172a;
      display: block;
    }
    .inst-sub {
      font-size: 9px;
      color: #94a3b8;
    }
    .badge-paid {
      display: inline-block;
      background: #ecfdf5;
      color: #047857;
      border: 1px solid #a7f3d0;
      font-size: 9px;
      font-weight: 800;
      padding: 2px 7px;
      border-radius: 9999px;
      text-transform: uppercase;
    }
    .badge-pending {
      display: inline-block;
      background: #fffbeb;
      color: #b45309;
      border: 1px solid #fde68a;
      font-size: 9px;
      font-weight: 800;
      padding: 2px 7px;
      border-radius: 9999px;
      text-transform: uppercase;
    }
    .amount-val {
      font-weight: 800;
      color: #0f172a;
      font-variant-numeric: tabular-nums;
    }
    table.installments-table tfoot td {
      background: #f8fafc;
      padding: 6px 12px;
      border-top: 1px solid #e2e8f0;
      font-size: 10.5px;
    }
    .tfoot-label {
      font-weight: 700;
      color: #475569;
      text-align: right;
    }
    .tfoot-amount-paid {
      font-weight: 900;
      color: #047857;
      font-size: 11.5px;
      text-align: right;
      font-variant-numeric: tabular-nums;
    }
    .tfoot-amount-total {
      font-weight: 900;
      color: #0f172a;
      font-size: 11.5px;
      text-align: right;
      font-variant-numeric: tabular-nums;
    }
    .tfoot-amount-due {
      font-weight: 900;
      color: #b45309;
      font-size: 11.5px;
      text-align: right;
      font-variant-numeric: tabular-nums;
    }
    .receipt-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 10px;
      border-top: 1.5px solid #e2e8f0;
      font-size: 10px;
      color: #64748b;
    }
    .verified-badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      color: #047857;
      font-weight: 700;
    }
    .signatory {
      font-size: 9.5px;
      color: #64748b;
      font-style: italic;
    }
  </style>
</head>
<body>
  <div class="receipt-container">
    <div class="receipt-header">
      <div>
        <img src="${resolvedLogoSrc}" class="logo-img" alt="Operating Media" />
        <div class="org-details">
          <strong>Operating Media Digital Education Pvt. Ltd.</strong><br />
          ${branch}, Mumbai, Maharashtra, India<br />
          Tax Invoice / Official Academic Payment Receipt
        </div>
      </div>
      <div class="ref-box">
        <span class="ref-label">RECEIPT REFERENCE</span>
        <span class="ref-val">${admissionNo}</span>
        <span class="ref-date">Date: <strong>${today}</strong></span>
      </div>
    </div>

    <div class="dossier-grid">
      <div>
        <span class="field-label">Student Name</span>
        <span class="field-val-bold">${name}</span>
        <span class="field-val-sub">${email}</span>
      </div>
      <div>
        <span class="field-label">Enrolled Program</span>
        <span class="field-val-bold">${course}</span>
        <span class="field-val-sub">${branch} &bull; Phone: ${phone}</span>
      </div>
    </div>

    <table class="installments-table">
      <thead>
        <tr>
          <th>Payment Description</th>
          <th class="text-center">Status</th>
          <th class="text-right">Amount Cleared</th>
        </tr>
      </thead>
      <tbody>
        ${rowsHtml}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="2" class="tfoot-label">Total Cleared to Date:</td>
          <td class="tfoot-amount-paid">&#8377;${totalPaidNum.toLocaleString("en-IN")}</td>
        </tr>
        <tr>
          <td colspan="2" class="tfoot-label">Total Course Investment:</td>
          <td class="tfoot-amount-total">&#8377;${totalFeesNum.toLocaleString("en-IN")}</td>
        </tr>
        <tr>
          <td colspan="2" class="tfoot-label">Remaining Balance Due:</td>
          <td class="tfoot-amount-due">&#8377;${balanceDueNum.toLocaleString("en-IN")}</td>
        </tr>
      </tfoot>
    </table>

    <div class="receipt-footer">
      <div class="verified-badge">
        &#10004; Payment Verified &amp; Stamped by Operating Media Accounts
      </div>
      <div class="signatory">
        Authorized Signatory: OM Accounts
      </div>
    </div>
  </div>
</body>
</html>`;

    let iframe = document.getElementById("receipt-print-iframe");
    if (!iframe) {
      iframe = document.createElement("iframe");
      iframe.id = "receipt-print-iframe";
      iframe.style.position = "fixed";
      iframe.style.top = "-9999px";
      iframe.style.left = "-9999px";
      iframe.style.width = "800px";
      iframe.style.height = "1100px";
      iframe.style.border = "none";
      document.body.appendChild(iframe);
    }

    const iframeDoc = iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(printHtml);
    iframeDoc.close();

    const triggerPrint = () => {
      try {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
      } catch (err) {
        console.error("Print error:", err);
      }
    };

    if (iframeDoc.images.length === 0) {
      setTimeout(triggerPrint, 150);
    } else {
      let loaded = 0;
      const total = iframeDoc.images.length;
      const done = () => {
        loaded++;
        if (loaded >= total) {
          setTimeout(triggerPrint, 150);
        }
      };
      for (let i = 0; i < total; i++) {
        if (iframeDoc.images[i].complete) {
          done();
        } else {
          iframeDoc.images[i].onload = done;
          iframeDoc.images[i].onerror = done;
        }
      }
      setTimeout(triggerPrint, 600);
    }
  };

  // Keyboard shortcut Ctrl+P / Cmd+P listener while modal is open
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "p") {
        e.preventDefault();
        handlePrint();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, profile]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0b1329] rounded-3xl max-w-2xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0 bg-slate-50/70 dark:bg-slate-900/80">
          <div>
            <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white leading-tight">
              Official Fee Receipt & Payment Breakdown
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Receipt #{admissionNo} • Operating Media Institute of Digital Marketing
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
              title="Print single-page receipt"
            >
              <Printer size={13} />
              <span className="hidden sm:inline">Print Receipt</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Receipt Content Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-white dark:bg-[#0b1329] space-y-6">
          {/* Receipt Top Section: Logo & Prepared For Box */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div>
              <img
                src={logo}
                alt="Operating Media"
                className="h-10 w-auto object-contain mb-2 dark:brightness-110"
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 font-normal leading-relaxed max-w-xs">
                Operating Media Digital Education Pvt. Ltd.
                <br />
                {branch}, Mumbai, Maharashtra, India
                <br />
                Tax Invoice / Official Academic Payment Receipt
              </p>
            </div>

            <div className="text-left sm:text-right bg-slate-50 dark:bg-slate-900/80 p-3.5 rounded border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                RECEIPT REFERENCE
              </span>
              <span className="text-lg font-black text-slate-900 dark:text-white leading-none">
                {admissionNo}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 block mt-1">
                Date: <strong className="text-slate-700 dark:text-slate-300">{today}</strong>
              </span>
            </div>
          </div>

          {/* Student Dossier Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-slate-50/70 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 rounded text-xs">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                Student Name
              </span>
              <strong className="text-slate-900 dark:text-white font-bold text-sm block mt-0.5">
                {name}
              </strong>
              <span className="text-slate-500 dark:text-slate-400 text-[11px]">{email}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                Enrolled Program
              </span>
              <strong className="text-slate-900 dark:text-white font-bold text-sm block mt-0.5">
                {course}
              </strong>
              <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                {branch} • Phone: {phone}
              </span>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="border border-slate-200 dark:border-slate-800 rounded overflow-hidden">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900 dark:bg-slate-800 text-white">
                  <th className="py-2.5 px-4 font-bold">Payment Description</th>
                  <th className="py-2.5 px-4 font-bold text-center">Status</th>
                  <th className="py-2.5 px-4 font-bold text-right">
                    Amount Cleared
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {installments.map((inst, idx) => {
                  const isPaid = String(inst.status || "").toUpperCase() === "PAID";
                  const dateStr = inst.date || inst.dueDate || "N/A";
                  const amountNum =
                    typeof inst.amount === "number" ? inst.amount : Number(inst.amount) || 0;

                  return (
                    <tr
                      key={idx}
                      className={
                        isPaid
                          ? "bg-white dark:bg-slate-900/50"
                          : "bg-slate-50/50 dark:bg-slate-900/20 opacity-75"
                      }
                    >
                      <td className="py-2.5 px-4">
                        <span className="font-semibold text-slate-900 dark:text-white block">
                          {inst.title}
                        </span>
                        <span className="text-[10.5px] text-slate-400 dark:text-slate-500">
                          Scheduled: {dateStr}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 text-center">
                        {isPaid ? (
                          <span className="inline-block bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30 font-bold text-[10px] px-2 py-0.5 rounded-full">
                            Paid
                          </span>
                        ) : (
                          <span className="inline-block bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30 font-bold text-[10px] px-2 py-0.5 rounded-full">
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-4 text-right font-black text-slate-900 dark:text-white tabular-nums">
                        ₹{amountNum.toLocaleString("en-IN")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 font-bold">
                <tr>
                  <td
                    colSpan="2"
                    className="py-2.5 px-4 text-slate-600 dark:text-slate-400 text-right"
                  >
                    Total Cleared to Date:
                  </td>
                  <td className="py-2.5 px-4 text-right text-emerald-700 dark:text-emerald-400 font-black text-sm tabular-nums">
                    ₹{((typeof totalPaid === "number" ? totalPaid : Number(totalPaid)) || 0).toLocaleString("en-IN")}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="2"
                    className="py-2 px-4 text-slate-600 dark:text-slate-400 text-right border-t border-slate-200 dark:border-slate-800"
                  >
                    Total Course Investment:
                  </td>
                  <td className="py-2 px-4 text-right text-slate-900 dark:text-white font-black tabular-nums border-t border-slate-200 dark:border-slate-800">
                    ₹{((typeof totalFees === "number" ? totalFees : Number(totalFees)) || 0).toLocaleString("en-IN")}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="2"
                    className="py-2 px-4 text-slate-600 dark:text-slate-400 text-right"
                  >
                    Remaining Balance Due:
                  </td>
                  <td className="py-2 px-4 text-right text-amber-800 dark:text-amber-400 font-black text-sm tabular-nums">
                    ₹{((typeof balanceDue === "number" ? balanceDue : Number(balanceDue)) || 0).toLocaleString("en-IN")}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold">
              <CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-400" />
              <span>
                Payment Verified & Stamped by Operating Media Accounts
              </span>
            </span>
            <span className="text-[11px] text-slate-400 dark:text-slate-500">
              Authorized Signatory: OM Accounts
            </span>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="px-6 py-3.5 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end space-x-2 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center space-x-1.5 shadow-xs"
            title="Download or Print single-page invoice PDF"
          >
            <Download size={13} />
            <span>Download Invoice PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
