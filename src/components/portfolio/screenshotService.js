/**
 * Screenshot Capture Service for Live Website Links
 * Specially designed for the WordPress module and live project showcases.
 * 
 * Primary Provider: WordPress.com mShots (Maintained by Automattic/WordPress, high-res 1280x800)
 * Fallback Provider: Microlink API & Thum.io
 */

export const normalizeUrl = (input) => {
  if (!input) return "";
  let clean = String(input).trim();
  if (!clean) return "";
  // Strip accidental quotes or brackets
  clean = clean.replace(/^["'<(\[]+|[>"')\]]+$/g, "");
  if (!clean) return "";
  // If no protocol is provided, default to https://
  if (!/^https?:\/\//i.test(clean)) {
    clean = `https://${clean}`;
  }
  return clean;
};

export const extractCleanDomain = (input) => {
  try {
    const norm = normalizeUrl(input);
    const parsed = new URL(norm);
    return parsed.hostname.replace(/^www\./i, "");
  } catch {
    return "";
  }
};

export const isValidWebUrl = (input) => {
  if (!input) return false;
  const norm = normalizeUrl(input);
  try {
    const u = new URL(norm);
    return Boolean(u.hostname && u.hostname.includes("."));
  } catch {
    return false;
  }
};

export const getWebsiteScreenshotUrl = (rawUrl, provider = "mshots") => {
  const url = normalizeUrl(rawUrl);
  if (!url) return "";

  if (provider === "microlink") {
    return `https://api.microlink.io?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`;
  }
  if (provider === "thum") {
    return `https://image.thum.io/get/width/1280/crop/800/${url}`;
  }
  // Default: WordPress.com mShots
  return `https://s0.wp.com/mshots/v1/${encodeURIComponent(url)}?w=1280&h=800`;
};

/**
 * Captures screenshot of a live website link UI.
 * Tries to return Base64 Data URL for offline persistence, with graceful fallback to direct service URL.
 */
export const captureWebsiteScreenshot = async (rawUrl) => {
  const cleanUrl = normalizeUrl(rawUrl);
  if (!cleanUrl || !isValidWebUrl(cleanUrl)) {
    throw new Error("Please enter a valid website link (e.g. https://wordpress.org or your-site.com)");
  }

  const primaryUrl = getWebsiteScreenshotUrl(cleanUrl, "mshots");

  // Attempt client-side fetch to convert to base64 Data URL (supports offline + PDF exports)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 9000);

    const res = await fetch(primaryUrl, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.ok) {
      const blob = await res.blob();
      // Ensure it's a valid image blob of reasonable size
      if (blob && blob.size > 1500) {
        return await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            if (typeof reader.result === "string" && reader.result.startsWith("data:image")) {
              resolve(reader.result);
            } else {
              resolve(primaryUrl);
            }
          };
          reader.onerror = () => resolve(primaryUrl);
          reader.readAsDataURL(blob);
        });
      }
    }
  } catch (err) {
    // If fetch failed (CORS or network timeout), direct URL works in standard <img> tags
    console.warn("Falling back to direct screenshot URL:", err);
  }

  return primaryUrl;
};
