/**
 * Formats student admission number with the base offset 8000 (e.g. ID 1 -> OMC-8001, ID 387 -> OMC-8387)
 */
export const formatAdmissionNo = (val) => {
  if (!val) return "";
  const numOnly = String(val).replace(/[^0-9]/g, "");
  if (!numOnly) return String(val);
  const num = parseInt(numOnly, 10);
  const offsetNum = num < 8000 ? 8000 + num : num;
  return `OMC-${offsetNum}`;
};
