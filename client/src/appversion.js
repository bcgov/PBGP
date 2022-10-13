/**
 * Returns whether or not the app is currently running on a domain
 * used by the border pilot app. Or if it's built specifically for that purpose
 * (based on REACT_APP_OUTPUT).
 *
 * Used to differentiate routes for border pilot and isolation plan app
 */
export const isBorderPilotApp = () => {
  if (
    process.env.REACT_APP_OUTPUT === 'RTOP_ADMIN' ||
    process.env.REACT_APP_OUTPUT === 'RTOP_TRAVELLER' ||
    process.env.REACT_APP_OUTPUT === 'ALL'
  ) {
    return true;
  }

  const borderPilotDomin =
    process.env.REACT_APP_BORDER_PILOT_DOMAIN || window._env_.REACT_APP_BORDER_PILOT_DOMAIN;
  return !!(borderPilotDomin && borderPilotDomin.includes(window.location.hostname));
};
