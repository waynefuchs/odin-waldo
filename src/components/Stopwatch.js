import { useEffect, useState } from "react";
import { useStopwatch } from "react-timer-hook";

import "../style/Stopwatch.css";

function Stopwatch({ timeStart, timeEnd, isGameOver }) {
  const { seconds, minutes, hours, days, isRunning, start, pause, reset } =
    useStopwatch({ autoStart: true });

  useEffect(() => {
    console.log("Game Is Over From Stopwatch!");
    if (isGameOver) pause();
    else start();
  }, [isGameOver]);

  function formatTimeNumber(num, s) {
    return num ? num + s : null;
  }

  function formatTime(days, hours, minutes, seconds) {
    return [
      formatTimeNumber(days, "d"),
      formatTimeNumber(hours, "h"),
      formatTimeNumber(minutes, "m"),
      formatTimeNumber(seconds, "s"),
    ]
      .filter((v) => v && v != 0)
      .join(" ");
  }

  // return isGameOver ? null : (
  return (
    <div className="stopwatch">{formatTime(days, hours, minutes, seconds)}</div>
  );
}

export default Stopwatch;
