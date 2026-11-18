/**
 * Formats student admission number with the base offset 8213 (e.g. ID 1 -> OMC-8214, ID 387 -> OMC-8600)
 */
export const STUDENT_ID_OFFSET = 8213;

export const formatAdmissionNo = (val) => {
  if (!val) return "";
  const numOnly = String(val).replace(/[^0-9]/g, "");
  if (!numOnly) return String(val);
  const num = parseInt(numOnly, 10);
  const offsetNum = num <= STUDENT_ID_OFFSET ? STUDENT_ID_OFFSET + num : num;
  return `OMC-${offsetNum}`;
};
