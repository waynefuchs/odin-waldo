import { useEffect } from "react";
import { useStopwatch } from "react-timer-hook";

import "../style/Stopwatch.css";

function Stopwatch({ isGameOver }) {
  const { seconds, minutes, hours, days, start, pause, reset } = useStopwatch({
    autoStart: true,
  });

  function formatTimeNumber(num, s) {
    if (!num && s === "s") return "0s";
    return num ? num + s : null;
  }

  function formatTime(days, hours, minutes, seconds) {
    return [
      formatTimeNumber(days, "d"),
      formatTimeNumber(hours, "h"),
      formatTimeNumber(minutes, "m"),
      formatTimeNumber(seconds, "s"),
    ]
      .filter((v) => v && v !== 0)
      .join(" ");
  }

  // Pause the timer when the game is over
  // Resume the timer if reset
  useEffect(() => {
    if (isGameOver) pause();
    else {
      reset();
      start();
    }
  }, [isGameOver, pause, reset, start]);

  return (
    <div className="stopwatch">{formatTime(days, hours, minutes, seconds)}</div>
  );
}

export default Stopwatch;
