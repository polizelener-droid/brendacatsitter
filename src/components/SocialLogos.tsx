import React from 'react';

export const WhatsAppLogo: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fill="#25D366"
      d="M12.011 0C5.38 0 .002 5.378 0 12.008c0 2.116.552 4.18 1.6 6.002L.06 24l6.115-1.603a11.98 11.98 0 005.836 1.51h.005c6.63 0 12.008-5.378 12.008-12.008C24.024 5.38 18.641 0 12.011 0z"
    />
    <path
      fill="#FFF"
      d="M12.011 2.18c5.42 0 9.828 4.409 9.831 9.828 0 2.45-.904 4.755-2.546 6.533l-.183.198-1.12 1.121a9.78 9.78 0 01-6.02 2.052h-.003a9.78 9.78 0 01-4.992-1.362l-.358-.213-3.71.973.99-3.618-.233-.37a9.78 9.78 0 01-1.498-5.21c0-5.419 4.408-9.827 9.828-9.827z"
    />
    <path
      fill="#25D366"
      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"
    />
  </svg>
);

export const InstagramLogo: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    aria-hidden="true"
  >
    <radialGradient id="igGradient1" cx="20%" cy="100%" r="150%">
      <stop offset="0%" stopColor="#ffd600" />
      <stop offset="25%" stopColor="#ff7a00" />
      <stop offset="50%" stopColor="#ff0069" />
      <stop offset="75%" stopColor="#d300c5" />
      <stop offset="100%" stopColor="#7638fa" />
    </radialGradient>
    <rect width="24" height="24" rx="6" fill="url(#igGradient1)" />
    <path
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="1.8"
      d="M12 7.1A4.9 4.9 0 1016.9 12 4.9 4.9 0 0012 7.1zm0 8.1A3.2 3.2 0 1115.2 12 3.2 3.2 0 0112 15.2zm5.2-8.5a1.15 1.15 0 11-1.15-1.15 1.15 1.15 0 011.15 1.15z"
    />
    <rect
      x="3.5"
      y="3.5"
      width="17"
      height="17"
      rx="4.5"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="1.8"
    />
  </svg>
);

export const TikTokLogo: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    aria-hidden="true"
  >
    <rect width="24" height="24" rx="6" fill="#000000" />
    {/* Cyan offset */}
    <path
      fill="#00F2FE"
      d="M16.6 8.2a5.2 5.2 0 00-3.1-3.2V3.5h-2.3v10.8a2.5 2.5 0 11-2.5-2.5c.3 0 .6.05.9.15V9.6a4.8 4.8 0 103.9 4.7V9.3a7.4 7.4 0 004.1 1.2V8.2z"
      transform="translate(-0.5, -0.5)"
    />
    {/* Red offset */}
    <path
      fill="#FF0050"
      d="M16.6 8.2a5.2 5.2 0 00-3.1-3.2V3.5h-2.3v10.8a2.5 2.5 0 11-2.5-2.5c.3 0 .6.05.9.15V9.6a4.8 4.8 0 103.9 4.7V9.3a7.4 7.4 0 004.1 1.2V8.2z"
      transform="translate(0.5, 0.5)"
    />
    {/* Main white body */}
    <path
      fill="#FFFFFF"
      d="M16.6 8.2a5.2 5.2 0 00-3.1-3.2V3.5h-2.3v10.8a2.5 2.5 0 11-2.5-2.5c.3 0 .6.05.9.15V9.6a4.8 4.8 0 103.9 4.7V9.3a7.4 7.4 0 004.1 1.2V8.2z"
    />
  </svg>
);

export const GmailLogo: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg
    viewBox="0 0 512 512"
    className={className}
    aria-hidden="true"
  >
    <path
      fill="#4285f4"
      d="M120 400H50c-16.5 0-30-13.5-30-30V142l100 75z"
    />
    <path
      fill="#34a853"
      d="M392 400h70c16.5 0 30-13.5 30-30V142l-100 75z"
    />
    <path
      fill="#fbbc04"
      d="M392 112v105l100-75v-20c0-28.5-31-46.5-55-32z"
    />
    <path
      fill="#ea4335"
      d="M120 112l136 102 136-102c0-25-20-45-45-45H165c-25 0-45 20-45 45z"
    />
    <path
      fill="#c5221f"
      d="M120 112v105L20 142v-20c0-28.5 31-46.5 55-32z"
    />
  </svg>
);
