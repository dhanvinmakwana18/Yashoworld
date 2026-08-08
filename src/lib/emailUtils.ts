/**
 * Smart Email Redirect Handler
 * - On desktop web browsers (Chrome, Edge, Safari), opens Gmail Web Compose directly in a new tab.
 * - On mobile devices (Android / iOS), triggers mailto: to launch the native Gmail or Mail app.
 */
export const openEmailClient = (
  email: string = 'pourfectionbyyashvi@gmail.com',
  subject: string = 'Inquiry for YashoWorld Handcrafted Resin Art',
  body: string = 'Hello YashoWorld team,\n\nI would like to inquire about...'
) => {
  const isMobile =
    typeof navigator !== 'undefined' &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  if (isMobile) {
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  } else {
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
  }
};
