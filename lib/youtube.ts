const YOUTUBE_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;

/**
 * Extract a YouTube video ID from common URL formats:
 *   - https://www.youtube.com/watch?v=VIDEO_ID
 *   - https://youtu.be/VIDEO_ID
 *   - https://www.youtube.com/shorts/VIDEO_ID
 *   - https://www.youtube.com/embed/VIDEO_ID
 *   - https://www.youtube.com/live/VIDEO_ID
 *
 * Returns null for anything that is not a valid YouTube video URL.
 */
export function extractYouTubeId(url: string): string | null {
  if (!url) return null;

  const trimmed = url.trim();
  if (!trimmed) return null;

  let hostname = "";
  try {
    hostname = new URL(trimmed).hostname.toLowerCase();
  } catch {
    return null;
  }

  const isYoutube =
    hostname === "youtube.com" ||
    hostname === "www.youtube.com" ||
    hostname === "youtu.be" ||
    hostname === "m.youtube.com" ||
    hostname.endsWith(".youtube.com");

  if (!isYoutube) return null;

  let candidate: string | null = null;

  if (hostname === "youtu.be") {
    candidate = trimmed.split(/[?#]/)[0].split("/").filter(Boolean).pop() || null;
  } else {
    const pathMatch = trimmed.match(/^\/(?:shorts|embed|live|v)\/([^/?#]+)/);
    if (pathMatch) {
      candidate = pathMatch[1];
    } else {
      try {
        candidate = new URL(trimmed).searchParams.get("v");
      } catch {
        candidate = null;
      }
    }
  }

  if (candidate && YOUTUBE_ID_PATTERN.test(candidate)) {
    return candidate;
  }

  return null;
}

export function isValidYouTubeUrl(url: string): boolean {
  return extractYouTubeId(url) !== null;
}

export function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}`;
}

export function getYouTubeThumbnailUrl(
  videoId: string,
  quality: "default" | "mqdefault" | "hqdefault" | "maxresdefault" = "hqdefault"
): string {
  return `https://i.ytimg.com/vi/${videoId}/${quality}.jpg`;
}
