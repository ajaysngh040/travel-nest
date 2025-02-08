/* eslint-disable react/prop-types */
const BASE_URL = import.meta.env.VITE_DEV_URL || import.meta.env.VITE_PROD_URL;

// eslint-disable-next-line react/prop-types
export default function Image({ src, alt = "", ...rest }) {
  if (!src) {
    return <img {...rest} src="/placeholder.jpg" alt="Placeholder" />;
  }

  let resolvedSrc = src;

  // Check if src is an absolute URL
  // eslint-disable-next-line react/prop-types
  if (
    !src.startsWith("http") &&
    !src.startsWith("https") &&
    !src.startsWith("/uploads/")
  ) {
    resolvedSrc = `${BASE_URL}/uploads/${src}`;
  }

  return <img {...rest} src={resolvedSrc} alt={alt} loading="lazy" />;
}
