import React from 'react';

/**
 * Minimalist "two interlocking wedding rings" glyph.
 * Thin-line, same visual language as the house (Home / Grid / Wrench) icons:
 * stroked with currentColor so it inherits the gold / muted-ash states.
 *
 * A true interlock: the front (right) ring is drawn as an open arc that breaks
 * where the back (left) ring crosses it, and a short segment of the front ring
 * is re-drawn on top at the opposite crossing so the two rings genuinely weave.
 */
export const InterlockingRings: React.FC<{
  className?: string;
  size?: number;
  strokeWidth?: number;
}> = ({ className = '', size = 18, strokeWidth = 1.4 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block shrink-0 ${className}`}
    aria-hidden="true"
  >
    {/* Front ring (right) — open arc, broken where the back ring passes over */}
    <path
      d="M 12.752 7.437 A 6 6 0 1 1 11.306 8.272"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    {/* Back ring (left) — full circle, drawn over the break above */}
    <circle
      cx="9"
      cy="13"
      r="6"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    {/* Front ring re-drawn on top at the lower crossing, completing the weave */}
    <path
      d="M 12.752 18.563 A 6 6 0 0 1 11.306 18.728"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Tiny WhatsApp glyph for the secondary CTA.
 * Solid mark (filled path) so it reads at 14px on a dark capsule.
 */
export const WhatsAppGlyph: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 14,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block shrink-0 ${className}`}
    aria-hidden="true"
  >
    <path d="M17.47 14.38c-.3-.15-1.75-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.53.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.22 3.07c.15.2 2.1 3.2 5.08 4.49.7.3 1.26.48 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.69.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z" />
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91a9.83 9.83 0 0 0-2.9-7A9.82 9.82 0 0 0 12.04 2zm0 18.02h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.39c0-4.54 3.7-8.23 8.25-8.23a8.17 8.17 0 0 1 5.82 2.42 8.16 8.16 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.23 8.24z" />
  </svg>
);
