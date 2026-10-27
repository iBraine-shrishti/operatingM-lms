// Sound synthesis using Web Audio API for LMS student & faculty notification chime
// No external mp3 downloads required, 0ms latency, works 100% offline and across all browsers.

let audioContext = null;
let lastPlayTime = 0;

const getAudioContext = () => {
  if (typeof window === "undefined") return null;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return null;
  if (!audioContext) {
    audioContext = new AudioCtx();
  }
  if (audioContext.state === "suspended") {
    audioContext.resume().catch(() => {});
  }
  return audioContext;
};

// Auto-unlock audio context on first user interaction anywhere on the page
if (typeof window !== "undefined") {
  const unlockAudio = () => {
    if (audioContext && audioContext.state === "suspended") {
      audioContext.resume().catch(() => {});
    }
    window.removeEventListener("click", unlockAudio);
    window.removeEventListener("keydown", unlockAudio);
    window.removeEventListener("touchstart", unlockAudio);
  };
  window.addEventListener("click", unlockAudio, { passive: true });
  window.addEventListener("keydown", unlockAudio, { passive: true });
  window.addEventListener("touchstart", unlockAudio, { passive: true });
}

export const playNotificationSound = (force = false) => {
  try {
    const now = Date.now();
    // Cooldown of 2 seconds to avoid repeated sound spam unless forced (e.g. preview button)
    if (!force && now - lastPlayTime < 2000) {
      return;
    }
    lastPlayTime = now;

    // Check user preference if muted
    const isMuted = localStorage.getItem("lms_notif_sound_muted") === "true";
    if (isMuted && !force) return;

    const ctx = getAudioContext();
    if (!ctx) return;

    const t = ctx.currentTime;

    // Tone 1: Gentle pleasant harmonic bell (D5: 587.33Hz)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(587.33, t);

    gain1.gain.setValueAtTime(0.0001, t);
    gain1.gain.exponentialRampToValueAtTime(0.22, t + 0.015);
    gain1.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);

    osc1.start(t);
    osc1.stop(t + 0.17);

    // Tone 2: Crisp affirmative chime (A5: 880Hz)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(880, t + 0.08);

    gain2.gain.setValueAtTime(0.0001, t + 0.08);
    gain2.gain.exponentialRampToValueAtTime(0.28, t + 0.095);
    gain2.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);

    osc2.start(t + 0.08);
    osc2.stop(t + 0.46);

    // Subtle sparkle overtone (E6: 1318.5Hz)
    const osc3 = ctx.createOscillator();
    const gain3 = ctx.createGain();
    osc3.type = "sine";
    osc3.frequency.setValueAtTime(1318.5, t + 0.11);

    gain3.gain.setValueAtTime(0.0001, t + 0.11);
    gain3.gain.exponentialRampToValueAtTime(0.08, t + 0.125);
    gain3.gain.exponentialRampToValueAtTime(0.0001, t + 0.38);

    osc3.connect(gain3);
    gain3.connect(ctx.destination);

    osc3.start(t + 0.11);
    osc3.stop(t + 0.39);
  } catch (err) {
    console.debug("LMS notification chime could not play:", err);
  }
};

export const isNotificationSoundMuted = () => {
  return localStorage.getItem("lms_notif_sound_muted") === "true";
};

export const toggleNotificationSound = () => {
  const current = isNotificationSoundMuted();
  const next = !current;
  localStorage.setItem("lms_notif_sound_muted", String(next));
  if (!next) {
    playNotificationSound(true); // Preview sound when unmuting
  }
  return next;
};
