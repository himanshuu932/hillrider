import React, { useMemo, useRef } from "react";
import logo from "../assets/logo.png";

export default function RegistrationPrint({
  languageType = "en",
  ngo = {
    name: "HILL RIDER MANAV SEWA SAMITI",
    logo: logo,
    tagline: "Serving Humanity with Dedication",
    address: "123 NGO Lane, Bhopal, MP",
    phone: "+91-9876543210",
    email: "contact@hillriderngo.org",
  },
  student = {
    firstName: "Aditi",
    lastName: "Sharma",
    dob: "2011-06-15",
    class: "8th",
    phone: "9876543210",
    school: "Springfield Public School",
    subject: "Mathematics",
    transactionId: "TXN123456789",
    amount: 500,
  },
  schema = [
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "dob", label: "Date of Birth" },
    { key: "class", label: "Class" },
    { key: "phone", label: "Phone Number" },
    { key: "school", label: "School" },
    { key: "subject", label: "Subject" },
    { key: "transactionId", label: "Transaction ID" },
    { key: "amount", label: "Amount" },
  ],
  registrationId = "HR-2025-001",
  issuedAt = new Date(),
  documentTitle,
}) {
  const printRef = useRef(null);

  const t = useMemo(() => {
    const map = {
      en: {
        documentTitle: documentTitle || "HR Olympiad Registration",
        regId: "Registration ID",
        issuedOn: "Issued On",
        studentDetails: "Student Details",
        printSave: "Print / Save as PDF",
      },
      hi: {
        documentTitle: documentTitle || "ओलंपियाड पंजीकरण",
        regId: "पंजीकरण आईडी",
        issuedOn: "जारी तिथि",
        studentDetails: "छात्र विवरण",
        printSave: "प्रिंट / पीडीएफ के रूप में सहेजें",
      },
    };
    return map[languageType] || map.en;
  }, [languageType, documentTitle]);

  const rows = useMemo(() => {
    const toLabel = (k) =>
      k
        .replace(/([A-Z])/g, " $1")
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase())
        .trim();

    if (schema && Array.isArray(schema) && schema.length) {
      return schema.map((f) => ({
        label: f.label || toLabel(f.key),
        value: safeVal(student[f.key]),
      }));
    }
    return Object.keys(student).map((key) => ({
      label: toLabel(key),
      value: safeVal(student[key]),
    }));
  }, [schema, student]);

  function safeVal(v) {
    if (v === null || v === undefined) return "-";
    if (typeof v === "boolean") return v ? "Yes" : "No";
    if (Array.isArray(v)) return v.join(", ");
    if (typeof v === "object") return JSON.stringify(v);
    return String(v);
  }

  const formattedDate = useMemo(() => {
    try {
      const d = new Date(issuedAt);
      return d.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "2-digit",
      });
    } catch {
      return String(issuedAt);
    }
  }, [issuedAt]);

  const handlePrint = () => {
    const prev = document.title;
    document.title = `${t.documentTitle}${registrationId ? ` - ${registrationId}` : ""
      }`;
    window.print();
    setTimeout(() => (document.title = prev), 500);
  };

  return (
    <div id="receipt" ref={printRef} className="max-w-3xl mx-auto bg-white ...">

      <div className="min-h-screen bg-gray-100 py-8 px-4 print:bg-white">
        <div className="max-w-3xl mx-auto mb-4 flex justify-end gap-3 print:hidden">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-lg bg-[#0A3153] text-white shadow hover:opacity-90 transition"
          >
            {t.printSave}
          </button>
        </div>

        <div
          ref={printRef}
          className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden print:shadow-none print:border-0"
        >

          <div className="flex items-center gap-4 p-6 border-b border-gray-200">
            {ngo.logo ? (
              <img
                src={ngo.logo}
                alt={`${ngo.name} logo`}
                className="w-16 h-16 object-contain rounded-md bg-white"
              />
            ) : (
              <div className="w-16 h-16 rounded-md bg-gray-200" />
            )}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                {ngo.name || "Your NGO"}
              </h1>
              {ngo.tagline && (
                <p className="text-sm text-gray-600 mt-0.5">{ngo.tagline}</p>
              )}
              {(ngo.address || ngo.phone || ngo.email) && (
                <div className="text-xs text-gray-500 mt-1 space-x-2">
                  {ngo.address && <span>{ngo.address}</span>}
                  {ngo.phone && <span>• {ngo.phone}</span>}
                  {ngo.email && <span>• {ngo.email}</span>}
                </div>
              )}
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">{t.issuedOn}</p>
              <p className="font-semibold text-gray-800">{formattedDate}</p>
              {registrationId && (
                <>
                  <p className="text-xs text-gray-500 mt-2">{t.regId}</p>
                  <p className="font-semibold text-gray-800">{registrationId}</p>
                </>
              )}
            </div>
          </div>
          <div className="px-6 pt-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {t.documentTitle}
            </h2>
            <p className="text-sm text-gray-500 mt-1">{t.studentDetails}</p>
          </div>

          <div className="p-6">
            <div className="rounded-xl border border-gray-200 overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {rows.map((row, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="w-1/3 px-4 py-3 font-medium text-gray-700 border-b border-gray-100">
                        {row.label}
                      </td>
                      <td className="px-4 py-3 text-gray-800 border-b border-gray-100">
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between items-end mt-10">
              <div className="text-sm text-gray-500">
                ____________________________
                <div className="mt-2 text-gray-700">Student / Parent Signature</div>
              </div>
              <div className="text-right text-sm text-gray-500">
                ____________________________
                <div className="mt-2 text-gray-700">Authorized Signatory</div>
              </div>
            </div>
          </div>
        </div>
        <style>{`
        @media print {
          @page { size: A4; margin: 16mm; }
          .print\\:hidden { display: none !important; }
          .print\\:shadow-none { box-shadow: none !important; }
          .print\\:border-0 { border: 0 !important; }
          .print\\:bg-white { background: #fff !important; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>
      </div>
    </div>
  );
}

