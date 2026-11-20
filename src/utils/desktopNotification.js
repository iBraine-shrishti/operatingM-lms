/**
 * Desktop Web Push Notification Service (WhatsApp Web Style)
 * Supports ServiceWorker showNotification and native window.Notification
 */

const SEEN_NOTIFS_KEY = "om_seen_desktop_notifs_lms";

function getSeenIds() {
  try {
    return new Set(JSON.parse(localStorage.getItem(SEEN_NOTIFS_KEY) || "[]"));
  } catch {
    return new Set();
  }
}

function saveSeenIds(set) {
  try {
    const arr = Array.from(set).slice(-300);
    localStorage.setItem(SEEN_NOTIFS_KEY, JSON.stringify(arr));
  } catch (e) {
    console.warn("Error saving seen notifications:", e);
  }
}

export function initServiceWorker() {
  if (typeof window !== "undefined" && "serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          console.log("[SW] Registered successfully for desktop notifications:", reg.scope);
        })
        .catch((err) => {
          console.warn("[SW] Registration skipped or failed:", err);
        });
    });
  }
}

export function isDesktopNotificationSupported() {
  return typeof window !== "undefined" && "Notification" in window;
}

export function getNotificationPermission() {
  if (!isDesktopNotificationSupported()) return "unsupported";
  return Notification.permission; // 'default', 'granted', 'denied'
}

export async function requestDesktopNotificationPermission() {
  if (!isDesktopNotificationSupported()) return false;
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      localStorage.setItem("om_desktop_notifs_enabled", "true");
      showDesktopNotification({
        id: "lms_welcome_alert",
        title: "LMS Desktop Notifications Active 🔔",
        body: "You will now receive instant desktop pop-ups for all lecture notices, cancellations, and batch updates.",
        tag: "lms_welcome",
        skipDuplicateCheck: true,
      });
      return true;
    }
    return false;
  } catch (err) {
    console.error("Failed to request notification permission:", err);
    return false;
  }
}

export async function showDesktopNotification({
  id,
  title,
  body,
  icon = "/OPM.png",
  badge = "/OPM.png",
  url = "/dashboard",
  tag,
  requireInteraction = false,
  skipDuplicateCheck = false,
}) {
  if (!isDesktopNotificationSupported()) return null;
  if (Notification.permission !== "granted") return null;

  const notifId = String(id || tag || `${title}_${body}`);
  const seen = getSeenIds();

  if (!skipDuplicateCheck && seen.has(notifId)) {
    return null; // Already shown
  }

  seen.add(notifId);
  saveSeenIds(seen);

  const options = {
    body: body || "",
    icon: icon || "/OPM.png",
    badge: badge || "/OPM.png",
    tag: tag || notifId,
    renotify: true,
    requireInteraction,
    data: { url: url || window.location.href },
  };

  try {
    // 1. Try modern Service Worker showNotification (preferred for OS level popups)
    if ("serviceWorker" in navigator) {
      try {
        const reg = await navigator.serviceWorker.ready;
        if (reg && reg.showNotification) {
          await reg.showNotification(title, options);
          return true;
        }
      } catch (swErr) {
        console.warn("[DesktopNotif] SW fallback:", swErr);
      }
    }

    // 2. Direct Window Notification fallback
    const n = new Notification(title, options);
    n.onclick = (e) => {
      e.preventDefault();
      window.focus();
      if (url && url !== "#") {
        window.location.href = url;
      }
      n.close();
    };
    return n;
  } catch (err) {
    console.error("[DesktopNotif] Failed to display notification:", err);
    return null;
  }
}
