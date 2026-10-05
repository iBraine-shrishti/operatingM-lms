import React from "react";
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

  const handlePrint = () => {
    window.print();
  };

  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/70">
          <div>
            <h3 className="font-bold text-sm sm:text-base text-slate-900 leading-tight">
              Official Fee Receipt & Payment Breakdown
            </h3>
            <p className="text-[11px] text-slate-500">
              Receipt #{admissionNo} • Operating Media Institute of Digital
              Marketing
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
            >
              <Printer size={13} />
              <span className="hidden sm:inline">Print Receipt</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Receipt Content Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-white space-y-6">
          {/* Receipt Top Section: Logo & Prepared For Box */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <img
                src={logo}
                alt="Operating Media"
                className="h-10 w-auto object-contain mb-2"
              />
              <p className="text-xs text-slate-500 font-normal leading-relaxed max-w-xs">
                Operating Media Digital Education Pvt. Ltd.
                <br />
                {branch}, Mumbai, Maharashtra, India
                <br />
                Tax Invoice / Official Academic Payment Receipt
              </p>
            </div>

            <div className="text-left sm:text-right bg-slate-50 p-3.5 rounded border border-slate-100">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                RECEIPT REFERENCE
              </span>
              <span className="text-lg font-black text-slate-900 leading-none">
                {admissionNo}
              </span>
              <span className="text-xs text-slate-500 block mt-1">
                Date: <strong className="text-slate-700">{today}</strong>
              </span>
            </div>
          </div>

          {/* Student Dossier Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-slate-50/70 border border-slate-200/80 rounded text-xs">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Student Name
              </span>
              <strong className="text-slate-900 font-bold text-sm block mt-0.5">
                {name}
              </strong>
              <span className="text-slate-500 text-[11px]">{email}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Enrolled Program
              </span>
              <strong className="text-slate-900 font-bold text-sm block mt-0.5">
                {course}
              </strong>
              <span className="text-slate-500 text-[11px]">
                {branch} • Phone: {phone}
              </span>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="border border-slate-200 rounded overflow-hidden">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="py-2.5 px-4 font-bold">Payment Description</th>
                  <th className="py-2.5 px-4 font-bold text-center">Status</th>
                  <th className="py-2.5 px-4 font-bold text-right">
                    Amount Cleared
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {installments.map((inst, idx) => (
                  <tr
                    key={idx}
                    className={
                      inst.status === "Paid"
                        ? "bg-white"
                        : "bg-slate-50/50 opacity-75"
                    }
                  >
                    <td className="py-2.5 px-4">
                      <span className="font-semibold text-slate-900 block">
                        {inst.title}
                      </span>
                      <span className="text-[10.5px] text-slate-400">
                        Scheduled: {inst.date}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      {inst.status === "Paid" ? (
                        <span className="inline-block bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-[10px] px-2 py-0.5 rounded-full">
                          Paid
                        </span>
                      ) : (
                        <span className="inline-block bg-amber-50 text-amber-700 border border-amber-200 font-bold text-[10px] px-2 py-0.5 rounded-full">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-4 text-right font-black text-slate-900 tabular-nums">
                      ₹{inst.amount.toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-50 border-t border-slate-200 font-bold">
                <tr>
                  <td
                    colSpan="2"
                    className="py-2.5 px-4 text-slate-600 text-right"
                  >
                    Total Cleared to Date:
                  </td>
                  <td className="py-2.5 px-4 text-right text-emerald-700 font-black text-sm tabular-nums">
                    ₹{totalPaid.toLocaleString("en-IN")}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="2"
                    className="py-2 px-4 text-slate-600 text-right border-t border-slate-200"
                  >
                    Total Course Investment:
                  </td>
                  <td className="py-2 px-4 text-right text-slate-900 font-black tabular-nums border-t border-slate-200">
                    ₹{totalFees.toLocaleString("en-IN")}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="2"
                    className="py-2 px-4 text-slate-600 text-right"
                  >
                    Remaining Balance Due:
                  </td>
                  <td className="py-2 px-4 text-right text-amber-800 font-black text-sm tabular-nums">
                    ₹{balanceDue.toLocaleString("en-IN")}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
              <CheckCircle2 size={14} className="text-emerald-600" />
              <span>
                Payment Verified & Stamped by Operating Media Accounts
              </span>
            </span>
            <span className="text-[11px] text-slate-400">
              Authorized Signatory: OM Accounts
            </span>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-end space-x-2 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center space-x-1.5"
          >
            <Download size={13} />
            <span>Download Invoice PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
