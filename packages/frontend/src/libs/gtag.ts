export const GA_TRACKING_ID: string =
  process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID || "";

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: URL) => {
  if (typeof window !== "object") return;
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value: string;
}) => {
  if (typeof window !== "object") return;
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
};
