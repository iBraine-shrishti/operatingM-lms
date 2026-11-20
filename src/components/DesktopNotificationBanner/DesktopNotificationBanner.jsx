import React, { useState, useEffect } from "react";
import { Bell, X, CheckCircle2 } from "lucide-react";
import {
  isDesktopNotificationSupported,
  getNotificationPermission,
  requestDesktopNotificationPermission,
} from "../../utils/desktopNotification";
import "./DesktopNotificationBanner.css";

const DISMISS_KEY = "om_dismissed_desktop_notif_banner_lms";

export default function DesktopNotificationBanner() {
  const [show, setShow] = useState(false);
  const [enabledJustNow, setEnabledJustNow] = useState(false);

  useEffect(() => {
    if (!isDesktopNotificationSupported()) return;

    const perm = getNotificationPermission();
    if (perm === "default") {
      const dismissedAt = localStorage.getItem(DISMISS_KEY);
      if (!dismissedAt || Date.now() - parseInt(dismissedAt, 10) > 3 * 86400 * 1000) {
        setShow(true);
      }
    }
  }, []);

  const handleEnable = async () => {
    const granted = await requestDesktopNotificationPermission();
    if (granted) {
      setEnabledJustNow(true);
      setTimeout(() => setShow(false), 2500);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="lms-desktop-notif-banner">
      <div className="lms-desktop-notif-banner-content">
        <div className="lms-desktop-notif-icon-wrap">
          <Bell size={18} className="bell-shake" />
        </div>
        <div className="lms-desktop-notif-text">
          <strong>Turn on desktop notifications</strong>
          <span>Get instant pop-up alerts on your laptop for lecture cancellations, time changes, and exam notices.</span>
        </div>
      </div>
      <div className="lms-desktop-notif-actions">
        {enabledJustNow ? (
          <span className="lms-desktop-notif-success">
            <CheckCircle2 size={16} /> Enabled!
          </span>
        ) : (
          <button className="lms-desktop-notif-btn" onClick={handleEnable}>
            Turn On
          </button>
        )}
        <button
          className="lms-desktop-notif-close"
          onClick={handleDismiss}
          title="Dismiss for now"
          aria-label="Close"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
