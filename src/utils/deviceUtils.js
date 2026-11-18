/**
 * Utilities for client device identification and session restriction (1 PC + 1 App)
 */

export const getDeviceId = () => {
  try {
    let devId = localStorage.getItem("om_lms_device_id");
    if (!devId) {
      if (typeof crypto !== "undefined" && crypto.randomUUID) {
        devId = `dev_${crypto.randomUUID()}`;
      } else {
        devId = `dev_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
      }
      localStorage.setItem("om_lms_device_id", devId);
    }
    return devId;
  } catch {
    return "dev_pc_fallback";
  }
};

export const getDeviceType = () => {
  if (typeof navigator === "undefined") return "PC";
  const ua = navigator.userAgent || "";
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  return isMobile ? "APP" : "PC";
};

export const getDeviceName = () => {
  if (typeof navigator === "undefined") return "Desktop PC";
  const ua = navigator.userAgent || "";
  let os = "Windows PC";
  if (/Windows NT 10.0/i.test(ua)) os = "Windows 10/11";
  else if (/Windows NT/i.test(ua)) os = "Windows PC";
  else if (/Macintosh|Mac OS X/i.test(ua)) os = "macOS";
  else if (/Android/i.test(ua)) os = "Android Device";
  else if (/iPhone/i.test(ua)) os = "iPhone";
  else if (/iPad/i.test(ua)) os = "iPad";
  else if (/Linux/i.test(ua)) os = "Linux PC";

  let browser = "Browser";
  if (/Edg\//i.test(ua)) browser = "Edge";
  else if (/Chrome\//i.test(ua)) browser = "Chrome";
  else if (/Firefox\//i.test(ua)) browser = "Firefox";
  else if (/Safari\//i.test(ua) && !/Chrome\//i.test(ua)) browser = "Safari";

  return `${os} • ${browser}`;
};

export const getSessionToken = () => {
  try {
    return localStorage.getItem("om_lms_session_token") || "";
  } catch {
    return "";
  }
};

export const setSessionToken = (token) => {
  try {
    if (token) {
      localStorage.setItem("om_lms_session_token", token);
    } else {
      localStorage.removeItem("om_lms_session_token");
    }
  } catch (e) {
    console.warn("Storage error saving session token:", e);
  }
};
