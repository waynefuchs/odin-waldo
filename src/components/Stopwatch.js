import { useEffect, useState } from "react";

import "../style/Stopwatch.css";

function Stopwatch({ timeStart, timeEnd }) {
  // This timer variable is only for updating the timeObject display
  const [timer, setTimer] = useState(0);

  const getTimeDisplay = () => {
    let delta = Math.floor((new Date() - timeStart) / 1000);
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
    display ||= seconds > 0;
    const textSeconds = display ? `${seconds}s` : null;

    return [textDays, textHours, textMinutes, textSeconds]
      .filter((i) => i)
      .join(" ");
  };

  // This updates the component every 1000ms, prompting a redraw
  let timerInterval = undefined;
  useEffect(() => {
    if (timerInterval) clearInterval(timerInterval);
    if (timeEnd) return;

    timerInterval = setInterval(() => {
      setTimer((timer) => getTimeDisplay());
    }, 1000);
  });

  return <div className="stopwatch">{timer}</div>;
}

export default Stopwatch;
