function msToText(time) {
  if (time < 0) time = 0;

  let delta = Math.floor(time / 1000);
  let display = false;

  const days = Math.floor(delta / 86400);
  delta -= days * 86400;
  display ||= days > 0;
  const textDays = display ? `${days}days` : null;

  const hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;
  display ||= hours > 0;
  const textHours = display ? `${hours}hours` : null;

  const minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;
  display ||= minutes > 0;
  const textMinutes = display ? `${minutes}m` : null;

  const seconds = delta % 60;
  const textSeconds = `${seconds}s`;

  return [textDays, textHours, textMinutes, textSeconds]
    .filter((i) => i)
    .join(" ");
}

export default msToText;
